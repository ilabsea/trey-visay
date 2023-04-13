import React, { useState, useEffect } from 'react';
import { RadioButton, Divider, Card } from 'react-native-paper';
import { Colors } from '../../assets/style_sheets/main/colors';
import {
  View,
  TouchableWithoutFeedback
} from 'react-native';
import Text from '../Text';

import { useFormikContext } from "formik";

const RadioGroup = ({name, options, disabled}) => {
  const { setFieldValue, values } = useFormikContext();

  const value = values[name];
  const getTextStyle = disabled ? {color: '#ccc'} : {};

  const buttonGroups = () => (
    options.map((option, i) =>
      <View key={i} style={{flexDirection: 'row', aligItems: 'center'}}>
        <RadioButton
          status={ value == option.value ? "checked" : "unchecked" }
          value={ option.value }
          color={ Colors.blue }
          uncheckedColor={Colors.blue}
          disabled={!!disabled} />

        <TouchableWithoutFeedback onPress={() => onValueChange(option.value)}>
          <View style={{flex: 1}}>
            <Text style={getTextStyle}>{option.name}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  )

  const onValueChange = (newValue) => {
    if (!!disabled) {
      return;
    }

    setFieldValue(name, newValue);

    // Callback
    // !!props.onValueChange && props.onValueChange(newValue);
  }

  return (
    <RadioButton.Group onValueChange={onValueChange} value={value}>
      { buttonGroups() }
    </RadioButton.Group>
  )
}

export default RadioGroup;
