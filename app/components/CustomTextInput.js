import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import PropTypes from 'prop-types';

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
        labelHeight={0}
        label=''
        value={input.value}
        multiline={true}
        onChangeText={ input.onChange }
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        ref={props.onRef }
        style={[validationStyles, disableStyle]}
      />
    </View>
  );
}

CustomTextInput.propTypes = {
  input: PropTypes.shape({
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    value: PropTypes.any.isRequired
  }).isRequired,
  meta: PropTypes.shape({
    active: PropTypes.bool.isRequired,
    error: PropTypes.string,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    visited: PropTypes.bool.isRequired
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
