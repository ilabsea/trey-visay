import React, {Component} from 'react';
import { TextInput } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import AppStyles from '../assets/style_sheets/app_styles';

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
            <RadioButton labelHorizontal={true} key={i}>
              <RadioButtonInput
                obj={obj}
                index={i}
                isSelected={this.props.value == obj.value}
                onPress={this.props.onPress}
                buttonSize={10}
                buttonOuterSize={20}
                buttonColor={'#4caf50'}
              />
              <RadioButtonLabel
                obj={obj}
                index={i}
                labelHorizontal={true}
                onPress={this.props.onPress}
                labelStyle={{fontSize: 16, lineHeight: 25, fontFamily: AppStyles.fonts.main,}}
                labelWrapStyle={{marginRight: 20, paddingVertical: 10}}
              />
            </RadioButton>)
        })}
      </RadioForm>
    );
  }
}

export default RadioGroup;
