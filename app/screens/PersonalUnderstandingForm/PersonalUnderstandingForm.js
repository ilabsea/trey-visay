import React from 'react';
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
  Icon
} from 'react-native-material-ui';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Provider, reset } from 'react-redux';
import store from '../../redux/store';

import PersonalUnderstanding from '../../data/models/personal_understanding';
import PersonalUnderstandingScore from './PersonalUnderstandingScore';
import CustomSubmitButton from './CustomSubmitButton';

import CareerPlanningForm from '../CareerPlanningForm/CareerPlanningForm';

import PopupDialog, {DialogTitle, SlideAnimation} from 'react-native-popup-dialog';

import Form from './_Form';
import realm from '../../schema';
import styles from './styles';
import headerStyles from '../../assets/style_sheets/header';

const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});

class PersonalUnderstandingForm extends React.Component {

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
      scrollEnabled: true,
      score: 0,
      redoTestBtnVisible: false,
      continueBtnVisible: false,
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({handleSubmit: this.handleSubmit});
  }

  handleSubmit = () => {
    formValues = this.parseFormValue(this.refs.form.selector.props.values);
    score = new PersonalUnderstandingScore(formValues).calculate();

    if (score < 12) {
      this.setState({redoTestBtnVisible: true});
    } else {
      this.setState({continueBtnVisible: true});
    }

    this.setState({scrollEnabled: false, score: score});
    this.popupDialog.show();
  };


  handleRedoBtnPress(){
    this.popupDialog.dismiss();
    console.log('handleRedoBtnPress');
    this.refs.form.selector({shouldComponentUpdate: true});
  };

  handleOnDismissPopupResult(){
    this.setState({scrollEnabled: true});
  };

  handleContinueBtnPress(){
    this.popupDialog.dismiss();
    this.refs.form.selector({shouldComponentUpdate: true});
    this.props.navigation.navigate('CareerPlanningFormScreen');
  };

  render(){
    const {handleSubmit} = this.props;
    return (
      <ScrollView scrollEnabled={this.state.scrollEnabled}>
        <PopupDialog
          dialogAnimation={slideAnimation}
          dialogTitle={<DialogTitle title="លទ្ធផលវាយតំលៃមុខរបរ" />}
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          onDismissed={() => {this.handleOnDismissPopupResult()}}
          height={200}>

          <View style={{flex: 1, alignItems: 'center',}}>
            <View style={{marginBottom: 10}}>
              <Text style={{textAlign: 'center'}}>Your result is {this.state.score}</Text>
            </View>

            {this.state.redoTestBtnVisible &&
              <View style={{width: 150, height: 50}}>
                <Button title='សូមសាកល្បងម្តងទៀត' onPress={() => this.handleRedoBtnPress()}></Button>
              </View>
            }

            {this.state.continueBtnVisible &&
              <View style={{width: 150, height: 50}}>
                <Button title='បន្ត' onPress={() => this.handleContinueBtnPress()}></Button>
              </View>
            }

          </View>
        </PopupDialog>
        <Provider store={store}>
          <Form ref={'form'} />
        </Provider>
      </ScrollView>
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

export default PersonalUnderstandingForm;
