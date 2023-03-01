import React, { useState, useEffect } from 'react';
import { RadioButton, Divider, Card } from 'react-native-paper';
import { Colors } from '../../assets/style_sheets/main/colors';
import {
  View,
  TouchableWithoutFeedback
} from 'react-native';
import Question from '../../data/json/personal_understanding.json';
import Text from '../Text';

const RadioGroup = (props) => {
  const question = Question[props.questionKey];
  const [value, setValue] = useState(props.value);
  const options = [
    { label: 'បាទ/ចាស', value: 'Yes' },
    { label: 'ទេ', value: 'No' },
    { label: 'មិនដឹង', value: 'Don_Know' }
  ];

  const getTextStyle = props.disabled ? {color: '#ccc'} : {};

  useEffect(() => {
    setValue(props.value);
  }, [props.value])

  const buttonGroups = () => (
    options.map((option, i) =>
      <View key={i} style={{flexDirection: 'row', aligItems: 'center'}}>
        <RadioButton
          status={ value == option.value ? "checked" : "unchecked" }
          value={ option.value }
          color={ Colors.blue }
          uncheckedColor={Colors.blue}
          disabled={!!props.disabled} />

        <TouchableWithoutFeedback onPress={() => onValueChange(option.value)}>
          <View style={{flex: 1}}>
            <Text style={getTextStyle}>{option.label}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  )

  const onValueChange = (newValue) => {
    if (!!props.disabled) {
      return;
    }

    setValue(newValue);

    // Callback
    !!props.onValueChange && props.onValueChange(newValue);
  }

  return (
    <RadioButton.Group onValueChange={onValueChange} value={value}>
      <Text style={getTextStyle}>{question}</Text>

      <Divider style={{marginVertical: 8}} />

      { buttonGroups() }
    </RadioButton.Group>
  )
}

export default RadioGroup;
