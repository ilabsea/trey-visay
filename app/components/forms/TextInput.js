import React from 'react';
import { View, StyleSheet} from 'react-native';
import { TextInput } from 'react-native-paper';
import { FontSetting } from '../../assets/style_sheets/font_setting';
import { useFormikContext } from "formik";
import ErrorMessage from './ErrorMessage';
import {inputBoxBorderRadius} from '../../constants/component_constant';
import Color from '../../themes/color';

const Question3 = (props) => {
  const getTextColor = props.disabled ? [styles.labelGroup, {color: '#ccc'}] : styles.labelGroup;
  const { setFieldTouched, handleChange, errors, touched, setFieldValue, values } = useFormikContext();
  const conditions = (props.condition || "").split('|');

  const isDisabled = () => {
    return !!conditions && values[conditions[0]] != conditions[1];
  }

  return (
    <View>
      <TextInput
        mode="outlined"
        placeholder='ចុចទីនេះដើម្បីសរសេរចម្លើយ'
        placeholderTextColor={Color.grayColor}
        style={[{fontSize: FontSetting.small_text}, isDisabled() && {backgroundColor: Color.disabledCardColor}]}
        outlineColor={Color.borderColor}
        outlineStyle={{borderWidth: 0.5, borderRadius: inputBoxBorderRadius}}
        value={ values[props.name] }
        onChangeText={ handleChange(props.name) }
        onBlur={() => setFieldTouched(props.name)}
        disabled={ isDisabled() }
      />

      <ErrorMessage error={errors[props.name]} visible={touched[props.name]} />
    </View>
  )
}

const styles = StyleSheet.create({
  labelGroup: {
    marginBottom: 10,
  },
})

export default Question3;
