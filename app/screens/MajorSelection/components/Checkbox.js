import React, { useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Checkbox, Divider } from 'react-native-paper';
import { Text } from "../../../components";
import Color from '../../../themes/color';

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
        color={ Color.blue }
      />

      <TouchableOpacity onPress={onPress} style={{flex: 1}}>
        <Text>{props.label}</Text>
      </TouchableOpacity>

      <Divider style={{width: 1, height: '100%',marginHorizontal: 8}} />

      <TouchableOpacity onPress={() => {alert(0)}}>
        <Text style={{fontSize: 12}}>ចូលមើលលម្អិត</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyCheckbox;
