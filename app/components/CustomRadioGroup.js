import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

var RadioButtonGroup = React.createClass({
  getInitialState: function() {
    return {
      value: 0,
    }
  },

  render: function() {
    const { labelStyle } = this.props;
    const buttonColor = this.props.buttonColor || '#4caf50';
    return (

      <RadioForm
        formHorizontal={true}
        radio_props={this.props.radio_props}
        buttonColor={buttonColor}
        initial={''}
        onPress={this.props.onPress}
        buttonSize={15}
        circleSize={10}
        labelStyle={[labelStyle, {marginLeft: 0, marginRight: 40, fontSize: 16}]}
      />
    );
  }
});



export default function CustomRadioGroup(props) {
  const { input, meta, ...radioProps } = props;

  const formStates = ['active', 'autofilled', 'asyncValidating', 'dirty', 'invalid', 'pristine',
    'submitting', 'touched', 'valid', 'visited'];

  return (
    <View>
      <RadioButtonGroup
        { ...radioProps}
        onPress={input.onChange}
      />
    </View>
  );
}
