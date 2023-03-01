import React, { useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';
import Text from "./Text";
import { Colors } from '../assets/style_sheets/main/colors';

const MyCheckbox = (props) => {
  const [checked, setChecked] = React.useState(props.checked);

  const onPress = () => {
    isChecked = !checked;

    setChecked(isChecked);
    !!props.onPress && props.onPress(isChecked, props.value);
  }

  useEffect(() => {
    setChecked(props.checked);
  }, [props.checked])

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Checkbox
        status={ checked ? 'checked' : 'unchecked' }
        onPress={ onPress }
        color={ Colors.blue }
      />

      <TouchableOpacity onPress={onPress}>
        <Text>{props.label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyCheckbox;
