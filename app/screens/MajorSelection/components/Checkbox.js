import React, { useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Checkbox, Divider } from 'react-native-paper';
import { Text } from "../../../components";
import Color from '../../../themes/color';
import {navigate} from '../../../hooks/RootNavigation';

const MyCheckbox = (props) => {
  const [checked, setChecked] = React.useState(props.checked);
  const onPress = () => {
    if (props.disabled && !checked)
      return;

    const isChecked = !checked;
    setChecked(isChecked);
    !!props.onPress && props.onPress(isChecked, props.value);
  }

  useEffect(() => {
    setChecked(props.checked);
  }, [props.checked])

  const showDetail = () => {
    if (props.type == 'major')
      return navigate('MajorDetailScreen', {title: props.label, major_code: props.value})

    navigate('JobDetailScreen', {title: props.label, job_code: props.value})
  }

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Checkbox.Android
        status={ checked ? 'checked' : 'unchecked' }
        onPress={ onPress }
        color={ Color.blue }
        uncheckedColor={props.disabled ? Color.lightGrayColor : null}
      />

      <TouchableOpacity onPress={onPress} style={{flex: 1, justifyContent: 'center', paddingVertical: 8}}>
        <Text style={{lineHeight: 28, color: props.disabled && !checked ? Color.gray : Color.blackColor}} allowTextHighlight={true}
          searchText={props.textSearch}
          label={props.label}
        />
      </TouchableOpacity>

      <Divider style={{width: 1, height: '65%',marginHorizontal: 8}} />

      <TouchableOpacity onPress={() => showDetail()}>
        <Text style={{fontSize: 13, color: Color.pressable}}>ចូលមើលលម្អិត</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyCheckbox;
