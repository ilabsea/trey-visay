import React from 'react';
import { View, Text, StyleSheet , Platform} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Divider } from 'react-native-elements';

class RadioButtonGroup extends React.Component {

  render() {
    const { labelStyle } = this.props;
    const buttonColor = this.props.buttonColor || '#4caf50';
    return (

      <RadioForm
        formHorizontal={false}
        animation={true}
        >
        { this.props.radio_props.map((obj, i) => {
          return(
            <View key={i}>
              <Divider/>
              <View  style={{alignItems: 'flex-start'}}>
                <RadioButton labelHorizontal={true} key={i} >
                  <RadioButtonInput
                    obj={obj}
                    index={i}
                    isSelected={this.props.value == obj.value}
                    onPress={this.props.onPress}
                    buttonSize={15}
                    circleSize={10}
                    buttonColor={buttonColor}
                    buttonWrapStyle={{marginTop: 15}}
                  />
                  <RadioButtonLabel
                    obj={obj}
                    index={i}
                    labelHorizontal={true}
                    onPress={this.props.onPress}
                    labelStyle={[this.props.labelStyle,{fontSize: 16, lineHeight: 28}]}
                    labelWrapStyle={{width: '95%', padding: 15, paddingBottom: Platform.OS == 'ios' ? 5 : 15}}
                  />
                </RadioButton>
              </View>
            </View>
          )
        })}
      </RadioForm>
    );
  }
}


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
