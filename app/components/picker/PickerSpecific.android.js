import React, {Component} from 'react';
import {
  Text,
  View,
} from 'react-native';
import styles from '../../assets/style_sheets/profile_form';
// import { Picker } from 'native-base';
// import {Picker} from '@react-native-picker/picker';

const PickerSpecific = (props) => {
  const _getPickerValue = (data) => {
    return props.user[data.stateName];
  }

  return null

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.labelColor}>{ props.data.label }</Text>
      <Picker
        mode='dialog'
        prompt='សូមជ្រេីសរេីស'
        selectedValue={ _getPickerValue(props.data) }
        onValueChange={ props.onValueChange}>
        { props.data.options.map((obj, i) => {
          { return (<Picker.Item key={i} label={obj.label} value={obj.code} />) }
          })
        }
      </Picker>
    </View>
  )
}

export default PickerSpecific;
