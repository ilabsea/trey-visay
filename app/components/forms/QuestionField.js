import React, {useState} from 'react';
import {View} from 'react-native'

import RadioGroup from './RadioGroup';
import TextInput from './TextInput';
import CheckboxGroup from './CheckboxGroup';
import { SELECT_ONE, SELECT_MULTIPLE, TEXT } from '../../constants/form_constant';

import { Divider } from 'react-native-paper';
import Text from '../Text';
import uuidv4 from '../../utils/uuidv4';
import { useFormikContext } from "formik";

export default FormFieldComponent = ({question}) => {
  const renderFormField = () => {
    switch (question.type) {
      case SELECT_ONE:
        return <RadioGroup {...question} />
        break;
      case SELECT_MULTIPLE:
        return <CheckboxGroup {...question} />
        break;
      case TEXT:
        return <TextInput {...question} />
        break;
    }
  }

  const renderQuestion = () => {
    return (
      <View key={uuidv4()}>
        <Text>{question.name}</Text>

        <Divider style={{marginVertical: 8}} />

        { renderFormField(question) }
      </View>
    )
  }

  return renderQuestion()
}
