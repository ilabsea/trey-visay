import React, {Component} from 'react';
import { TextInput } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

class RadioGroup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <RadioForm formHorizontal={true} animation={true}>
        { this.props.options.map((obj, i) => {
          return(
            <RadioButton labelHorizontal={true} key={i}>
              <RadioButtonInput
                obj={obj}
                index={i}
                isSelected={this.props.value == obj.value}
                onPress={this.props.onPress}
                buttonSize={10}
                buttonOuterSize={20}
              />
              <RadioButtonLabel
                obj={obj}
                index={i}
                labelHorizontal={true}
                onPress={this.props.onPress}
                labelStyle={{fontSize: 20}}
                labelWrapStyle={{marginRight: 20}}
              />
            </RadioButton>)
        })}
      </RadioForm>
    );
  }
}

export default RadioGroup;
