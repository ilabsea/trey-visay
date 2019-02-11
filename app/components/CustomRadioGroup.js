import React from 'react';
import { View, Text, StyleSheet , Platform} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Divider } from 'react-native-elements';
import RadioButtonGroup from './radio_button_group';

export default function CustomRadioGroup(props) {
  const { input, meta, ...radioProps } = props;

  const formStates = ['active', 'autofilled', 'asyncValidating', 'dirty', 'invalid', 'pristine',
    'submitting', 'touched', 'valid', 'visited'];

  return (
    <View>
      <RadioButtonGroup
        { ...radioProps}
        onPress={input.onChange}
        value={input.value}
      />
    </View>
  );
}
