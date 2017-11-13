import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  Modal,
} from 'react-native';

import {
  ThemeProvider,
  Toolbar,
  Icon
} from 'react-native-material-ui';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Provider, reset } from 'react-redux';
import store from '../../redux/store';

import PersonalUnderstanding from '../../data/models/personal_understanding';
import PersonalUnderstandingScore from './PersonalUnderstandingScore';
import CustomSubmitButton from './CustomSubmitButton';
import CareerPlanningForm from '../CareerPlanningForm/CareerPlanningForm';

import Form from './_Form';
import realm from '../../schema';
import styles from './styles';
import headerStyles from '../../assets/style_sheets/header';

const uiTheme = {
  palette: {
    primaryColor: '#1976d2',
  }
};

export default class PersonalUnderstandingForm extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'វាយតម្លៃមុខរបរ',
    headerTitle: <Text style={headerStyles.headerTitleStyle}>វាយតម្លៃមុខរបរ</Text>,
    headerStyle: headerStyles.headerStyle,
    headerLeft: <ThemeProvider uiTheme={{}}>
                  <TouchableOpacity onPress={() => goBack()} style={{marginHorizontal: 16}}>
                    <Icon name='close' color='#fff' size={24} />
                  </TouchableOpacity>
                </ThemeProvider>,
    headerRight: <ThemeProvider uiTheme={{}}>
                  <Provider store={store}>
                    <TouchableOpacity style={headerStyles.actionWrapper} onPress={() => navigation.state.params.handleSubmit()}>
                      <Icon name="done" color='#fff' size={24} />
                      <Text style={headerStyles.saveText}>រក្សាទុក</Text>
                    </TouchableOpacity>
                  </Provider>
                 </ThemeProvider>,

    drawerIcon: ({ tintColor }) => (
      <AwesomeIcon name="briefcase" size={16}  color={tintColor} />
    ),
  });

  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      modalVisible: false,
    };
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  componentDidMount() {
    this.props.navigation.setParams({handleSubmit: this.handleSubmit});
  }

  handleSubmit = () => {
    formValues = this.parseFormValue(this.refs.form.selector.props.values);
    score = new PersonalUnderstandingScore(formValues).calculate();

    this.setState({score: score});
    this.setModalVisible(!this.state.modalVisible);
  };

  handleRedoBtnPress() {
    console.log('handleRedoBtnPress');
    this.refs.form.selector({shouldComponentUpdate: true});
  };

  handleContinueBtnPress(){
    this.refs.form.selector({shouldComponentUpdate: true});
    this.props.navigation.navigate('CareerPlanningFormScreen');
  };

  render(){
    const {handleSubmit} = this.props;
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <ScrollView>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {alert("សូមចុចលើប៊ូតុង")}}
            >

            <Toolbar
              centerElement={<Text style={[headerStyles.headerTitleStyle, {marginLeft: 0}]}>វាយតម្លៃមុខរបរ និង អាជីព</Text>}
              onLeftElementPress={() => this.props.navigation.navigate('DrawerOpen')}
            />
            <ScrollView style={{backgroundColor: 'rgba(0,0,0,0.05)'}}>
              <View style={{margin: 16, padding: 16, backgroundColor: '#fff'}}>
                <View>
                  <Text style={styles.subTitle}>លទ្ធផលនៃការវាយតម្លៃមុខរបរ</Text>
                </View>

                { this.state.score < 12 &&
                  <View>
                    <View style={styles.paragraph}>
                      <Text>
                        ពិន្ទុរបស់ប្អូននៅទាបជាង 50% ដូចនេះយើងតម្រូវអោយប្អូនត្រូវធ្វើតេស្តឡើងវិញម្តងទៀតមិននឹងឈានទៅវគ្គបន្ទាប់។
                      </Text>
                    </View>

                    <View style={styles.paragraph}>
                      <Text>
                        ការជ្រើសរើសជំនាញនិង អាជីពមួយនាពេលអនាគត គឺមានសារៈសំខាន់ណាស់សម្រាប់បុគ្គល
                        ម្នាក់ៗ ដើម្បីទទួលបានចំណេះដឹង និងវិជ្ជាជីវៈគ្រប់គ្រាន់ និងឈានទៅប្រកួតប្រជែងទីផ្សារការងារនាពេលបច្ចុប្បន្ន។​
                        ដូច្នេះការកំណត់ផែនការអាជីព និងការសម្រេចចិត្តជ្រើសរើសយក​ជំនាញ
                        ជាកត្តាជំរុញឆ្ពោះទៅរកជំនាញជាក់លាក់ដែលអាចធ្វើឲ្យមនុស្សមានជំនឿជាក់លើខ្លួនឯង
                        និងក្លាហានក្នុងស្វែងរកមុខរបរ ដើម្បីកសាងអនាគតរបស់ខ្លួន។
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

                    <View style={styles.paragraph}>
                      <TouchableHighlight onPress={() => {
                        this.setModalVisible(!this.state.modalVisible)
                        store.dispatch({type: 'RESET'})
                      }} style={styles.button}>
                        <Text style={styles.btnText}>សូមសាកល្បងធ្វើតេស្តម្តងទៀត</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                }

                { !(this.state.score < 12) &&
                  <View>
                    <View style={styles.paragraph}>
                      <Text>
                        សូមអបអរសាទរ ពិន្ទុរបស់ប្អូននៅលើសពី 50% ហើយ ដូចនេះប្អូនអាចបន្តទៅវគ្គបន្ត។
                      </Text>
                    </View>

                    <View>
                      <TouchableHighlight onPress={() => {
                        this.props.navigation.navigate('CareerPlanningFormScreen');
                        this.setModalVisible(!this.state.modalVisible)
                      }} style={styles.button}>
                        <Text style={styles.btnText}>ចូលទៅកាន់វគ្គបន្ត</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                }
              </View>
            </ScrollView>
          </Modal>

          <Provider store={store}>
            <Form ref={'form'} />
          </Provider>
        </ScrollView>
      </ThemeProvider>
    );
  };


  submitForm(values){
    // realm.write(() => {
    //   realm.create('PersonalUnderstanding', this.buildFormValue(values));
    //   alert(JSON.stringify(realm.objects('PersonalUnderstanding')[realm.objects('PersonalUnderstanding').length - 1]));
    // });
  };

  parseFormValue(values){
    if(values){
      values['uuid'] = '123';
      if(values['everTalkedWithAnyoneAboutCareer']){
        values['everTalkedWithAnyoneAboutCareer'] = values['everTalkedWithAnyoneAboutCareer'].map(function(i){ return {value: i }; } );
      }
    }
    return values;
  };
}
