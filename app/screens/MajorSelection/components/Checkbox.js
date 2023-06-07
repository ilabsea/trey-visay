import React, { useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Checkbox, Divider } from 'react-native-paper';
import { Text } from "../../../components";
import Color from '../../../themes/color';
import {navigate} from '../../../hooks/RootNavigation';

const MyCheckbox = (props) => {
  const [checked, setChecked] = React.useState(props.checked);
  const onPress = () => {
    const isChecked = !checked;
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

      <TouchableOpacity onPress={onPress} style={{flex: 1, justifyContent: 'center', paddingVertical: 8}}>
        <Text style={{lineHeight: 28}}>{props.label}</Text>
      </TouchableOpacity>

      <Divider style={{width: 1, height: '65%',marginHorizontal: 8}} />

      <TouchableOpacity onPress={() => navigate('MajorDetailScreen', {major_code: props.value})}>
        <Text style={{fontSize: 13, color: Color.pressable}}>ចូលមើលលម្អិត</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyCheckbox;