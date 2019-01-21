import React, {Component} from 'react';
import { View, TextInput, Platform } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Divider } from 'react-native-elements';

class RadioGroup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { labelStyle } = this.props;
    const buttonColor = this.props.buttonColor || '#4caf50';

    return (
      <RadioForm
        formHorizontal={false}
        animation={true}
        >
        { this.props.options.map((obj, i) => {
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

export default RadioGroup;
