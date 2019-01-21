import React, {Component} from 'react';
import { View, TextInput, Platform } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Divider } from 'react-native-elements';

class RadioGroup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {style, formVertical, ...props} = this.props;

    return (
      <RadioForm formHorizontal={!formVertical} animation={true} style={style}>
        { this.props.options.map((obj, i) => {
          return(
            <View key={i}>
              <View  style={{alignItems: 'flex-start'}}>
                <RadioButton labelHorizontal={true} key={i} >
                  <RadioButtonInput
                    obj={obj}
                    index={i}
                    isSelected={this.props.value == obj.value}
                    onPress={this.props.onPress}
                    buttonSize={10}
                    buttonColor='#4caf50'
                  />
                  <RadioButtonLabel
                    obj={obj}
                    index={i}
                    labelHorizontal={true}
                    onPress={this.props.onPress}
                    labelStyle={{fontSize: 16, lineHeight: 28}}
                    labelWrapStyle={{marginRight: 20, paddingVertical: 3}}
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
