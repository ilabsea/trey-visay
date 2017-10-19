
import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

import { TextField } from 'react-native-material-textfield';

import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';

export default function CustomTextInput(props) {
  const { input, meta, ...inputProps } = props;

  const formStates = ['active', 'autofilled', 'asyncValidating', 'dirty', 'invalid', 'pristine',
    'submitting', 'touched', 'valid', 'visited'];

    const validationStyles = meta.touched && !meta.active
      ? meta.valid ? styles.valid : styles.invalid
      : null;

    const disableStyle = styles.disable;

  return (
    <View>
      <TextField
        {...inputProps}
        label=''
        value={input.value}
        onChangeText={ input.onChange }
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        multiline={true}
        labelHeight={0}
        style={[validationStyles, disableStyle]}
      />
    </View>
  );
}

CustomTextInput.propTypes = {
  input: React.PropTypes.shape({
    onBlur: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onFocus: React.PropTypes.func.isRequired,
    value: React.PropTypes.any.isRequired
  }).isRequired,
  meta: React.PropTypes.shape({
    active: React.PropTypes.bool.isRequired,
    error: React.PropTypes.string,
    invalid: React.PropTypes.bool.isRequired,
    pristine: React.PropTypes.bool.isRequired,
    visited: React.PropTypes.bool.isRequired
  }).isRequired
};


const styles = StyleSheet.create({
  // valid: {
  //   borderBottomWidth: 1,
  //   borderColor: 'green'
  // },
  // invalid: {
  //   borderBottomWidth: 1,
  //   borderColor: 'red'
  // },
  //

});
