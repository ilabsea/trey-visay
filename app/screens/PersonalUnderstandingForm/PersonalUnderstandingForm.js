import React from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  TouchableHighlight,
  TouchableNativeFeedback,
  Icon,
} from 'react-native';


import { reduxForm, Field } from 'redux-form';
import { Provider } from 'react-redux';
import store from '../../redux/store';

import PersonalUnderstanding from '../../data/models/personal_understanding';
import Form from './_Form';
import realm from '../../schema';

import styles from './styles';


class PersonalUnderstandingForm extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'ការវាយតំលៃ',
    headerRight: <TouchableNativeFeedback>
                  <Text style={styles.buttonText} onPress={() => navigation.state.params.handleSave()}>រក្សាទុក</Text>
                 </TouchableNativeFeedback>,

  });

  constructor(props) {
    super(props);
    this.state = {}

  };

  componentDidMount() {
    this.props.navigation.setParams({handleSave: this.handleSave});
  }

  handleSave(){
    alert('save');
  }

  render(){
    return (
      <Provider store={store}>
        <Form onSubmit={(values) => this.submitForm(values)}
          // everThoughtOfCareerIsYes={true}
        />
      </Provider>
    );
  };

  submitForm(values){
    alert(JSON.stringify(values));
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
