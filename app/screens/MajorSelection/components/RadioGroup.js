import React, { useState, useEffect } from 'react';
import { RadioButton, Divider, Card } from 'react-native-paper';
import Color from '../../../themes/color';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback
} from 'react-native';

import { useFormikContext } from "formik";
import { ErrorMessage, Text } from '../../../components';

const RadioGroup = ({name, options, disabled}) => {
  const { setFieldValue, values, errors, touched } = useFormikContext();
  const value = values[name];
  const getTextStyle = disabled ? {color: '#ccc'} : {};

  const buttonGroup = (option, index) => {
    const isChecked = value == option.value;
    const borderColor = isChecked ? Color.blue : "#fff";

    return (
      <Card style={styles.card} key={index}>
        <View style={[styles.cardWrapper, {borderColor: borderColor}]}>
          <TouchableWithoutFeedback onPress={() => onValueChange(option.value)}>
            <View style={{flex: 1}}>
              <Text style={getTextStyle}>{option.name}</Text>
            </View>
          </TouchableWithoutFeedback>

          <RadioButton
            status={ isChecked ? "checked" : "unchecked" }
            value={ option.value }
            color={ Color.blue }
            uncheckedColor={Color.blue}
            disabled={!!disabled} />
        </View>
      </Card>
    )
  }

  const buttonGroups = () => (
    options.map((option, i) => {
      return buttonGroup(option, i);
    })
  )

  const onValueChange = (newValue) => {
    if (!!disabled) {
      return;
    }

    setFieldValue(name, newValue);
  }

  return (
    <RadioButton.Group onValueChange={onValueChange} value={value}>
      { buttonGroups() }

      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </RadioButton.Group>
  )
}

const styles = StyleSheet.create({
  buttonWrapper: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardWrapper: {
    flexDirection: 'row',
    padding: 12,
    borderWidth: 2
  },
  divider: {
    width: 1,
    height: '100%',
    marginHorizontal: 8
  },
  card: {
    marginVertical: 8,
    overflow: 'hidden'
  }
});

export default RadioGroup;
