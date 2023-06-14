import React, { useState, useEffect } from 'react';
import Checkbox from './Checkbox';
import ErrorMessage from './ErrorMessage';
import { useFormikContext } from "formik";
import { View } from 'react-native';
import Color from '../../themes/color';
import {pressableItemSize} from '../../constants/component_constant';

const CheckboxGroup = ({name, options}) => {
  const { setFieldTouched, handleChange, errors, touched, setFieldValue, values } = useFormikContext();
  const selectedValues = values[name] || [];

  const toggleSelectedValues = (isChecked, value) => {
    let newSelected;

    if (isChecked) {
      newSelected = [...selectedValues, value];
    } else {
      let index = selectedValues.indexOf(value);
      newSelected = [...selectedValues.slice(0, index), ...selectedValues.slice(index + 1)]
    }

    return newSelected;
  }

  const onPress = (isChecked, value) => {
    let newSelected = toggleSelectedValues(isChecked, value);

    setFieldValue(name, newSelected);
  };

  return (
    <View>
      {
        options.map((option, index) => (
          <View key={`c_${index}`} style={{minHeight: 50, borderBottomWidth: index == options.length - 1 ? 0 : 0.5, justifyContent: 'center', borderColor: Color.gray, height: pressableItemSize}}>
            <Checkbox
              key={ index }
              value={ option.value }
              label={ option.name }
              onPress={ onPress }
              checked={ selectedValues && selectedValues.indexOf(option.value) !== -1 }
            />
          </View>
        ))
      }

      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
};

export default CheckboxGroup;
