import React, { useState, useEffect } from 'react';
import Checkbox from './Checkbox';

const CheckboxGroup = (props) => {
  const [selected, setSelected] = React.useState(props.selected || []);
  var previousSelected = [];

  useEffect(() => {
    if (props.selected) {
      setSelected(props.selected);
    }
  }, [props.selected])

  const toggleSelectedValues = (isChecked, value) => {
    let newSelected;

    if (isChecked) {
      newSelected = [...selected, value];
    } else {
      let index = selected.indexOf(value);
      newSelected = [...selected.slice(0, index), ...selected.slice(index + 1)]
    }

    return newSelected;
  }

  const onPress = (isChecked, value) => {
    const { onSelect, limitCheckedItems } = props;
    let newSelected = toggleSelectedValues(isChecked, value);

    if (!!limitCheckedItems && newSelected.length > limitCheckedItems) {
      setSelected(previousSelected)
      onSelect && onSelect(newSelected);
      return;
    }

    previousSelected = newSelected;

    setSelected(newSelected);

    onSelect && onSelect(newSelected);
  };

  return (
    props.options.map((option, index) => (
      <Checkbox
        key={ index }
        value={ option.value }
        label={ option.label }
        onPress={ onPress }
        checked={ selected && selected.indexOf(option.value) !== -1 }
      />
    ))
  );
};

export default CheckboxGroup;
