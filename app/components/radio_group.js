import React, {Component} from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

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
    ...Platform.select({
      android: {
        lineHeight: 18
      },
      ios: {
        lineHeight: 28
      },
    })
  }
})

export default RadioGroup;
