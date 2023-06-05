import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Text } from '../../../components';
import { ErrorMessage } from '../../../components/forms';
import { useFormikContext } from "formik";
import Color from '../../../themes/color';
import {inputBoxBorderRadius} from '../../../constants/component_constant';

const TextInputComponent = ({label, name, iconName, ...otherProps}) => {
  const { errors, touched, setFieldValue, values } = useFormikContext();

  return (
    <View>
      <Text>{label}</Text>
      <TextInput
        mode="outlined"
        left={<TextInput.Icon icon='account' size={30} iconColor={Color.grayColor} />}
        style={{backgroundColor: Color.whiteColor}}
        outlineColor={Color.borderColor}
        outlineStyle={{borderWidth: 0.5, borderRadius: inputBoxBorderRadius}}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        {...otherProps}
      />

      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  )
}

export default TextInputComponent;