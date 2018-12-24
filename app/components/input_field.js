import React, {Component} from 'react';

import {
  TextInput,
  Platform,
} from 'react-native';

import { TextField } from 'react-native-material-textfield';

class InputField extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let InputSpecific = Platform.OS === 'ios' ? TextField : TextInput;
    return <InputSpecific
              labelHeight={0}
              label=''
              {...this.props}/>;
  }
}

export default InputField;
