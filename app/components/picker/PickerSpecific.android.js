import React, {Component} from 'react';
import {
  View,
} from 'react-native';
import styles from '../../assets/style_sheets/profile_form';
import { Picker as SelectPicker } from 'native-base';
import { useFormikContext } from "formik";
import {FontFamily} from '../../themes/font';
import Color from '../../themes/color';
import Text from '../Text';
import ErrorMessage from '../forms/ErrorMessage';

const PickerSpecific = ({label, name, options}) => {
  const { errors, touched, setFieldValue, values } = useFormikContext();

  return (
    <View style={styles.inputContainer}>
      <Text>{ label }</Text>

      <View style={{borderBottomColor: Color.borderColor, borderWidth: 0.5}}>
        <SelectPicker
          mode='dialog'
          prompt='សូមជ្រេីសរេីស'
          selectedValue={ values[name] }
          onValueChange={ (itemValue, itemIndex) => setFieldValue(name, itemValue) }>

          { options.map((obj, i) =>
            <SelectPicker.Item key={i} label={obj.label} value={obj.code} fontFamily={FontFamily.regular} />
          )}
        </SelectPicker>
      </View>

      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  )
}

export default PickerSpecific;
