import React from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';


import { reduxForm, Field } from 'redux-form';
import { Provider } from 'react-redux';
import store from '../../redux/store';

import PersonalUnderstanding from '../../data/models/personal_understanding';
import Form from './_Form';

import styles from './styles';

class PersonalUnderstandingForm extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;

    return {
      title: 'Personal Understanding'
    };
  };


  constructor(props) {
    super(props);
    this.state = {};
  };

  render(){
    return (
      <Provider store={store}>
        <Form onSubmit={(values) => this.submitForm(values)} />
      </Provider>
    );
  };

  submitForm(values){
    alert(JSON.stringify(values));
  };
}

export default PersonalUnderstandingForm;
