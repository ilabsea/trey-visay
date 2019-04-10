import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

import Toast, { DURATION } from 'react-native-easy-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Provider } from 'react-redux';
import store from '../../redux/store';

import PersonalUnderstandingScore from './PersonalUnderstandingScore';
import CloseButton from '../../components/shared/close_button';
import SaveButton from '../../components/shared/save_button';

import Form from './_Form';
import realm from '../../schema';
import User from '../../utils/user';
import uuidv4 from '../../utils/uuidv4';
import styles from './styles';
import headerStyles from '../../assets/style_sheets/header';


export default class PersonalUnderstandingForm extends Component {

  static navigationOptions = ({ navigation }) => ({
    drawerIcon: ({ tintColor }) => (
      <AwesomeIcon name="briefcase" size={16}  color={tintColor} />
    ),
  });

  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      modalVisible: false,
      testCount: 0,
    };
  };

  _handleBack() {
    this.props.navigation.state.params.refresh();
    this.props.navigation.goBack();
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  componentDidMount() {
    this.props.navigation.setParams({
      handleSubmit: this.handleSubmit,
      _handleBack: this._handleBack.bind(this)
    });
  }

  handleSubmit = () => {
    let formValues = this.parseFormValue(this.refs.form.selector.props.values);

    if (!formValues) {
      return this.refs.toast.show('សូមបំពេញសំណួរខាងក្រោមជាមុនសិន...!', DURATION.SHORT);
    }

    this.submitForm(this._buildData(formValues));
  };

  _buildData(formValues) {
    let score = new PersonalUnderstandingScore(formValues).calculate();
    let obj = Object.assign({}, formValues);

    obj.userUuid = User.getID();
    obj.score = score.toString();

    return obj;
  }

  submitForm(values) {
    let user = User.getCurrent();
    let game = user.games[user.games.length - 1];
    let list = game.personalUnderstandings;

    realm.write(() => {
      list.push(values);

      this.setState({testCount: list.length, score: values.score});
      this.setModalVisible(!this.state.modalVisible);
    });
  };

  _renderFailTest() {
    return (
      <View>
        <View style={styles.paragraph}>
          { this.state.testCount < 2 &&
            <Text>
              ពិន្ទុរបស់ប្អូននៅទាបជាង 50% ដូចនេះយើងតម្រូវឲ្យប្អូនត្រូវធ្វើតេស្តឡើងវិញម្តងទៀតមុននឹងឈានទៅវគ្គបន្ទាប់។
            </Text>
          }

          { this.state.testCount > 1 &&
            <Text>
              ពិន្ទុរបស់ប្អូននៅទាបជាង 50% តែយើងលើកទឹកចិត្តប្អូនឲ្យបន្តទៅវគ្គបន្ទាប់។
            </Text>
          }
        </View>

        <View style={styles.paragraph}>
          <Text>
            ការជ្រើសរើសជំនាញនិង អាជីពមួយនាពេលអនាគត គឺមានសារៈសំខាន់ណាស់សម្រាប់បុគ្គល
            ម្នាក់ៗ ដើម្បីទទួលបានចំណេះដឹង និងវិជ្ជាជីវៈគ្រប់គ្រាន់ និងឈានទៅប្រកួតប្រជែងទីផ្សារការងារនាពេលបច្ចុប្បន្ន។​
            ដូច្នេះការកំណត់ផែនការអាជីព និងការសម្រេចចិត្តជ្រើសរើសយក​ជំនាញ
            ជាកត្តាជំរុញឆ្ពោះទៅរកជំនាញជាក់លាក់។
          </Text>
        </View>

        <View style={styles.paragraph}>
          <Text>
            យើងសង្ឈឹមថា ប្អូនៗបំពេញកម្រងសំណួរនេះឡើងវិញដោយពិចារណាយ៉ាងល្អិតល្អន់
            និងអាចកំណត់ជ្រើសរើសមុខរបរមួយដែលខ្លួនពេញចិត្ត។​
            ក្នុងនាមយើងជាយុវជនម្នាក់ត្រូវមានភាពក្លាហានក្នុងការបង្កើតក្ដីសុបិន្តឲ្យបានធំទូលាយនិងវែងឆ្ងាយ ប្រសើរជាងបុគ្គលដែលរស់នៅដែលគ្មានគោលដៅច្បាស់លាស់។​(សូមសែ្វងយល់សុភាសិតអប់រំខាងក្រោម៖)
          </Text>
        </View>

        <View style={styles.paragraph}>
          <Text>
            ១ មនុស្សម្នាក់ៗមិនអាចជ្រើសរើស កំណើតក្នុងគ្រួសារអ្នកមានឬអ្នកក្របានទេ
            ប៉ុន្ដែបុគ្គលនោះអាចកំណត់ជីវភាពរស់នៅបានប្រសើរ តាមរយៈការមានអាជីពមួយដ៏ល្អ។
          </Text>
          <Text>
            ២ តាំងចិត្តឲ្យបានខ្ពស់ រស់នៅជាមួយក្ដីសង្ឈឹម ទើបជីវិតមានតម្លៃពិតៗ
          </Text>
        </View>

        <View style={[styles.paragraph, {flexDirection: 'row', justifyContent: 'center'}]}>
          <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
              store.dispatch({type: 'RESET'})
            }} style={styles.button}
            underlayColor="rgba(0, 128, 0, 0.2)"
          >
            <Text style={styles.btnText}>
              {this.state.testCount < 2 && 'សូម'}
              សាកល្បងធ្វើតេស្តម្តងទៀត
            </Text>
          </TouchableHighlight>

          { this.state.testCount > 1 &&
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate('CareersScreen');
              this.setModalVisible(!this.state.modalVisible)
            }} style={[styles.button, {marginLeft: 20}]}>
              <Text style={styles.btnText}>ចូលទៅកាន់វគ្គបន្ត</Text>
            </TouchableOpacity>
          }
        </View>
      </View>
    )
  }

  _renderPassTest() {
    return (
      <View>
        <View style={styles.paragraph}>
          <Text>
            សូមអបអរសាទរ ពិន្ទុរបស់ប្អូននៅលើសពី 50% ហើយ ដូចនេះប្អូនអាចបន្តទៅវគ្គបន្ត។
          </Text>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('CareersScreen');
              this.setModalVisible(!this.state.modalVisible)
            }}
            style={styles.button}>
            <Text style={styles.btnText}>ចូលទៅកាន់វគ្គបន្ត</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  parseFormValue(values){
    if(values){
      values['uuid'] = uuidv4();
      if(values['everTalkedWithAnyoneAboutCareer']) {
        values['everTalkedWithAnyoneAboutCareer'] = values['everTalkedWithAnyoneAboutCareer'].map(function(i){ return {value: i }; } );
      }
    }
    return values;
  };

  render() {
    return (
      <View>
        <KeyboardAwareScrollView>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => { this.refs.toast.show('សូមចុចលើប៊ូតុង...!', DURATION.SHORT) } }>

            <ScrollView>
              <View style={{margin: 16, padding: 16, backgroundColor: '#fff'}}>
                <View>
                  <Text style={styles.subTitle}>លទ្ធផលនៃការស្វែងយល់អំពីខ្លួនឯង</Text>
                </View>

                { this.state.score < 12 && this._renderFailTest() }
                { this.state.score >= 12 && this._renderPassTest() }

              </View>
            </ScrollView>
          </Modal>

          <Provider store={store}>
            <Form ref={'form'} />
          </Provider>

        </KeyboardAwareScrollView>
        <Toast ref='toast' positionValue={ Platform.OS == 'ios' ? 120 : 140 }/>
      </View>
    );
  };
}
