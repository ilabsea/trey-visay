import React, { useState, useEffect } from 'react';
import Checkbox from './Checkbox';
import ErrorMessage from './ErrorMessage';
import { useFormikContext } from "formik";
import { View } from 'react-native';
import SelectOneListItem from './SelectOneListItem';

const SelectOneListItemGroup = ({name, options}) => {
  const { setFieldValue, values, errors, touched } = useFormikContext();
  const value = values[name];

  return (
    <View>
      {
        options.map((option, index) => (
          <SelectOneListItem
            value={option.value}
            label={option.name}
            checked={option.value == value}
            onPressSelect={ (val) => setFieldValue(name, val) }
            onPressViewDetail={ () => {} }
          />
        ))
      }

      <ErrorMessage error={errors[name]} visible={touched[name]}/>
    </View>
  );
};

export default SelectOneListItemGroup;
