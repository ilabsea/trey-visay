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
    return (

      <RadioForm
        formHorizontal={true}
        radio_props={this.props.radio_props}
        buttonColor={'#4caf50'}
        initial={''}
        onPress={this.props.onPress}
        buttonSize={15}
        circleSize={10}
        labelStyle={{marginLeft: 0, marginRight: 10, fontSize: 16}}
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

// const styles = StyleSheet.create({
//   formGroup: {
//     marginTop: 10,
//   },
//   labelGroup: {
//     marginBottom: 10
//   }
// })
