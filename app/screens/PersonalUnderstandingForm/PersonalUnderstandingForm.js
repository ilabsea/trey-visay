import React from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  TouchableHighlight,
  TouchableNativeFeedback,
  Modal,
} from 'react-native';

import {
  ThemeProvider,
} from 'react-native-material-ui';

import Icon from 'react-native-vector-icons/FontAwesome';
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


const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});

class PersonalUnderstandingForm extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'ការវាយតំលៃ',
    headerRight: <Provider store={store}><CustomSubmitButton handleSubmit={() => navigation.state.params.handleSubmit()} /></Provider>,
    drawerIcon: ({ tintColor }) => (
      <ThemeProvider uiTheme={{}}>
        <Icon name="list" />
      </ThemeProvider>
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
    if(score < 50){
      this.setState({redoTestBtnVisible: true});
    }else{
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
      if(values['everTalkedWithAnyoneAboutCarrerr']){
        values['everTalkedWithAnyoneAboutCarrerr'] = values['everTalkedWithAnyoneAboutCarrerr'].map(function(i){ return {value: i }; } );
      }
    }
    return values;
  };
}

export default PersonalUnderstandingForm;
