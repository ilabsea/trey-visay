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
    const {...props} = this.props;
    let InputSpecific = Platform.OS === 'ios' ? TextField : TextInput;
    return <InputSpecific
              labelHeight={0}
              label=''
              ref={this.props.inputRef}
              {...props}/>;
  }
}

export default InputField;
