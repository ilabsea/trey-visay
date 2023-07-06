import React from 'react';
import { View, StyleSheet} from 'react-native';
import { TextInput } from 'react-native-paper';
import { FontSetting } from '../../assets/style_sheets/font_setting';
import { useFormikContext } from "formik";
import ErrorMessage from './ErrorMessage';
import {inputBoxBorderRadius} from '../../constants/component_constant';
import Color from '../../themes/color';
import FormCard from './FormCard';
import personalUnderstandingHelper from '../../helpers/personal_understanding_helper';

const Question3 = ({question}) => {
  const { setFieldTouched, handleChange, errors, touched, values } = useFormikContext();

  if (!personalUnderstandingHelper.isQuestionVisible(question, values))
    return;

  const renderTextInput = () => {
    const {code} = question;
    return <View>
              <TextInput
                mode="outlined"
                placeholder='ចុចទីនេះដើម្បីសរសេរចម្លើយ'
                placeholderTextColor={Color.grayColor}
                style={[{fontSize: FontSetting.small_text}]}
                outlineColor={Color.borderColor}
                outlineStyle={{borderWidth: 0.5, borderRadius: inputBoxBorderRadius}}
                value={ values[code] }
                onChangeText={ handleChange(code) }
                onBlur={() => setFieldTouched(code)}
              />

              <ErrorMessage error={errors[code]} visible={touched[code]} />
            </View>
  }

  return <FormCard question={question}>
          {renderTextInput()}
         </FormCard>
}

export default Question3;
