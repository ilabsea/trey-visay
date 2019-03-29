import React, {Component} from 'react';
import { View, Text} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {FontSetting} from '../assets/style_sheets/font_setting';

class RadioButtonGroup extends Component {

  render() {
    const { labelStyle } = this.props;
    const buttonColor = this.props.buttonColor || '#4caf50';
    return (

      <RadioForm
        formHorizontal={false}
        animation={true}
        style={{marginLeft: 16}}
        >
        { this.props.radio_props.map((obj, i) => {
          return(
            <View key={i}>
              <View  style={{alignItems: 'flex-start', justifyContent: 'center'}}>
                <RadioButton labelHorizontal={true} key={i} onPress={this.props.onPress}>
                  <RadioButtonInput
                    obj={obj}
                    index={i}
                    isSelected={this.props.value == obj.value}
                    onPress={this.props.onPress}
                    buttonSize={8}
                    buttonColor={buttonColor}
                  />
                  <RadioButtonLabel
                    obj={obj}
                    index={i}
                    labelHorizontal={true}
                    onPress={this.props.onPress}
                    labelStyle={[this.props.labelStyle,{fontSize: FontSetting.text, lineHeight: 26}]}
                    labelWrapStyle={{width: '95%', paddingBottom: 8}}
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
