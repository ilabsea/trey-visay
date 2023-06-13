import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Text } from '../../../components';
import FormErrorMessage from './FormErrorMessage';
import { useFormikContext } from "formik";
import Color from '../../../themes/color';
import {inputBoxBorderRadius} from '../../../constants/component_constant';
import {FontSetting} from '../../../assets/style_sheets/font_setting';

const TextInputComponent = ({label, name, iconName, required, ...otherProps}) => {
  const { errors, touched, setFieldValue, values } = useFormikContext();

  return (
    <View>
      <View style={styles.labelContainer}>
        <Text style={{fontSize: FontSetting.sub_title, color: Color.lightBlackColor}}>{label}{required && <Text style={{color: Color.requiredColor, fontSize: FontSetting.sub_title}}> *</Text>}</Text>
      </View>
      <TextInput
        mode="outlined"
        left={<TextInput.Icon icon={iconName} size={30} iconColor={Color.grayColor} />}
        style={{backgroundColor: Color.whiteColor}}
        outlineColor={Color.borderColor}
        outlineStyle={{borderWidth: 0.5, borderRadius: inputBoxBorderRadius}}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        {...otherProps}
      />
      <FormErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  )
}

const styles = StyleSheet.create({
  labelContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: 32,
    paddingHorizontal: 5,
    position: 'absolute',
    left: 12,
    top: -10,
    zIndex: 1,
  }
})

export default TextInputComponent;