import React from 'react';
import { RadioButton } from 'react-native-paper';
import { Colors } from '../../assets/style_sheets/main/colors';
import {
  View,
  TouchableWithoutFeedback
} from 'react-native';
import Text from '../Text';
import FormCard from './FormCard';

import { useFormikContext } from "formik";
import ErrorMessage from './ErrorMessage';
import Color from '../../themes/color';
import {pressableItemSize} from '../../constants/component_constant';
import personalUnderstandingHelper from '../../helpers/personal_understanding_helper';

const RadioGroup = ({question}) => {
  const {code, options, disabled} = question;
  const { setFieldValue, values, errors, touched } = useFormikContext();

  const value = values[code];
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

    setFieldValue(code, newValue);

    // Callback
    // !!props.onValueChange && props.onValueChange(newValue);
  }

  if (!personalUnderstandingHelper.isQuestionVisible(question, values)) {
    values[code] = '';
    return;
  }

  return (
    <FormCard question={question}>
      <RadioButton.Group onValueChange={onValueChange} value={value}>
        { buttonGroups() }
        <ErrorMessage error={errors[code]} visible={touched[code]} />
      </RadioButton.Group>
    </FormCard>
  )
}

export default RadioGroup;
