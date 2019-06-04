import React, {Component} from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

class RadioGroup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {style, formVertical, ...props} = this.props;
    let disabled = this.props.disabled ? this.props.disabled : false;
    console.log('disabled : ', disabled);
    return (
      <RadioForm formHorizontal={!formVertical} animation={true} style={style}>
        { this.props.options.map((obj, i) => {
          return(
            <View key={i}>
              <View  style={{alignItems: 'flex-start'}}>
                <RadioButton
                  labelHorizontal={true}
                  key={i} >
                  <RadioButtonInput
                    obj={obj}
                    index={i}
                    isSelected={this.props.value == obj.value}
                    onPress={this.props.onPress}
                    buttonSize={8}
                    buttonColor='rgb(24, 118, 211)'
                    disabled={disabled }
                    buttonWrapStyle={styles.buttonWrapper}
                  />
                  <RadioButtonLabel
                    obj={obj}
                    index={i}
                    disabled={disabled }
                    labelHorizontal={true}
                    onPress={this.props.onPress}
                    labelStyle={styles.label}
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

const styles = StyleSheet.create({
  label: {
    lineHeight: 30
  },
  buttonWrapper: {
    marginTop: 5
  }
})

export default RadioGroup;
