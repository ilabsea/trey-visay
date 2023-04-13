import React, { useState, useEffect } from 'react';
import Checkbox from './Checkbox';
import { useFormikContext } from "formik";

const CheckboxGroup = (props) => {
  const { setFieldTouched, handleChange, errors, touched, setFieldValue, values } = useFormikContext();
  const selectedValues = values[props.name] || [];
  var previousSelected = [];

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
    const { onSelect, limitCheckedItems } = props;
    let newSelected = toggleSelectedValues(isChecked, value);

    if (!!limitCheckedItems && newSelected.length > limitCheckedItems) {
      setFieldValue(props.name, newSelected);
      onSelect && onSelect(newSelected);
      return;
    }

    previousSelected = newSelected;
    setFieldValue(props.name, newSelected);
    onSelect && onSelect(newSelected);
  };

  return (
    props.options.map((option, index) => (
      <Checkbox
        key={ index }
        value={ option.value }
        label={ option.name }
        onPress={ onPress }
        checked={ selectedValues && selectedValues.indexOf(option.value) !== -1 }
      />
    ))
  );
};

export default CheckboxGroup;
