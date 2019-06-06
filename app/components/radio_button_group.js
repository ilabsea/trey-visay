import React, {Component} from 'react';
import { View, Text, Platform } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {FontSetting} from '../assets/style_sheets/font_setting';
import { Colors } from '../assets/style_sheets/main/colors';

class RadioButtonGroup extends Component {

  render() {
    const { labelStyle } = this.props;
    const buttonColor = this.props.buttonColor || Colors.blue;
    return (

      <RadioForm
        formHorizontal={false}
        animation={true}
        >
        { this.props.radio_props.map((obj, i) => {
          return(
            <View key={i}>
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
                    labelStyle={[this.props.labelStyle,{fontSize: FontSetting.text, lineHeight: Platform.OS == 'android' ? 32: 26}]}
                    labelWrapStyle={{width: '95%', paddingVertical: 15, paddingBottom: 5}}
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

export default RadioButtonGroup;
