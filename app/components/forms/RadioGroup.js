import React from 'react';
import { RadioButton } from 'react-native-paper';
import { Colors } from '../../assets/style_sheets/main/colors';
import {
  View,
  TouchableWithoutFeedback
} from 'react-native';
import Text from '../Text';

import { useFormikContext } from "formik";
import ErrorMessage from './ErrorMessage';
import Color from '../../themes/color';
import {pressableItemSize} from '../../constants/component_constant';

const RadioGroup = ({name, options, disabled}) => {
  const { setFieldValue, values, errors, touched } = useFormikContext();

  const value = values[name];
  const getTextStyle = disabled ? {color: '#ccc'} : {};

  const buttonGroups = () => (
    options.map((option, i) =>
      <View key={i} style={{flexDirection: 'row', alignItems: 'center', borderBottomWidth: i == options.length - 1 ? 0 : 0.5, borderColor: Color.gray, height: pressableItemSize}}>
        <RadioButton.Android
          status={ value == option.value ? "checked" : "unchecked" }
          value={ option.value }
          color={ Colors.blue }
          uncheckedColor={Colors.blue}
          disabled={!!disabled}
        />

        <TouchableWithoutFeedback onPress={() => onValueChange(option.value)}>
          <View style={{flex: 1, justifyContent: 'center', height: '100%', marginLeft: 10}}>
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
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </RadioButton.Group>
  )
}

export default RadioGroup;
