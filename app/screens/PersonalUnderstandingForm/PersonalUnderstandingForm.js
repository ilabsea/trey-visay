import React from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  TouchableHighlight,
  TouchableNativeFeedback,
  Icon,
  formValueSelector,
} from 'react-native';


import { reduxForm, Field, submit } from 'redux-form';
import { Provider } from 'react-redux';
import store from '../../redux/store';

import PersonalUnderstanding from '../../data/models/personal_understanding';

import PersonalUnderstandingScore from './PersonalUnderstandingScore';
import RemoteSubmitButton from './RemoteSubmitButton';


import Form from './_Form';
import realm from '../../schema';

import styles from './styles';

// import submit from './submit';


class PersonalUnderstandingForm extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'ការវាយតំលៃ',
    headerRight: <TouchableNativeFeedback>
                  <Text style={styles.buttonText} onPress={() => navigation.state.params.handleSubmit()}>រក្សាទុក</Text>
                 </TouchableNativeFeedback>,

  });

  // static navigationOptions = ({ navigation }) => ({
  //   title: 'ការវាយតំលៃ',
  //   headerRight: <TouchableNativeFeedback>
  //                 <Text style={styles.buttonText} onPress={()=> this.handleSubmit}>រក្សាទុក</Text>
  //                </TouchableNativeFeedback>,
  //
  // });

  constructor(props) {
    super(props);
    this.state = {};
  };

  componentDidMount() {
    this.props.navigation.setParams({handleSave: this.handleSave});
    this.props.navigation.setParams({handleSubmit: this.handleSubmit});
  }

  handleSave(){
    alert('handleSave');
    // submit('personalUnderstandingForm');
  }


  render(){
    const { handleSubmit } = this.props;
    return (

      <Provider store={store}>
        <View>
          <Form />
          <RemoteSubmitButton />
        </View>
      </Provider>
    );
  };


  submitForm(values){
    alert('submit');
    formValues = this.buildFormValue(values);
    console.log(new PersonalUnderstandingScore(formValues).calculate());
    // realm.write(() => {
    //   realm.create('PersonalUnderstanding', this.buildFormValue(values));
    //   alert(JSON.stringify(realm.objects('PersonalUnderstanding')[realm.objects('PersonalUnderstanding').length - 1]));
    // });
  };



  buildFormValue(values){
    values['uuid'] = '123';
    values['everTalkedWithAnyoneAboutCarrerr'] = values['everTalkedWithAnyoneAboutCarrerr'].map(function(i){ return {value: i }; } );
    return values;
  };
}

export default PersonalUnderstandingForm;
