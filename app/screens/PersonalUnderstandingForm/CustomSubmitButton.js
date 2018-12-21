import React from 'react'
import { connect } from 'react-redux'
import { submit } from 'redux-form'
import styles from './styles'

import {
  Button,
  Text,
  TouchableNativeFeedback,
  TouchableHighlight,
} from 'react-native';

class CustomSubmitButton extends React.Component{
  constructor(props) {
    super(props);
  };
  
  handleClick = () => {
    this.props.handleSubmit();
  }

  render(){
    let TouchablePlatformSpecific = Platform.OS === 'ios' ?
        TouchableHighlight :
        TouchableNativeFeedback;
    return (
      <TouchablePlatformSpecific>
        <Text style={styles.buttonText} onPress={() => this.props.dispatch(submit('personalUnderstandingForm', this.handleClick() ))}>រក្សាទុក</Text>
      </TouchablePlatformSpecific>
    )
  }


}

export default connect()(CustomSubmitButton)
