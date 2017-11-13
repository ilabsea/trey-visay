import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

var RadioButtonGroup = React.createClass({

  render: function() {
    const { labelStyle } = this.props;
    const buttonColor = this.props.buttonColor || '#4caf50';
    return (

      <RadioForm
        formHorizontal={true}
        animation={true}
        >
        { this.props.radio_props.map((obj, i) => {
          return(
            <RadioButton labelHorizontal={true} key={i}>
              <RadioButtonInput
                obj={obj}
                index={i}
                isSelected={this.props.value == obj.value}
                onPress={this.props.onPress}
                buttonSize={15}
                circleSize={10}
                buttonColor={buttonColor}
              />
              <RadioButtonLabel
                obj={obj}
                index={i}
                labelHorizontal={true}
                onPress={this.props.onPress}
                labelStyle={[labelStyle, {marginLeft: 0, marginRight: 40, fontSize: 16}]}
                labelWrapStyle={{marginRight: 20, paddingVertical: 10}}
              />
            </RadioButton>)
        })}
      </RadioForm>
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
        value={input.value}
      />
    </View>
  );
}
