import React, {Component} from 'react';
import {
  Text,
  View,
  Picker
} from 'react-native';
import IOSPicker from 'react-native-ios-picker';
import styles from '../../assets/style_sheets/profile_form';

class PickerSpecific extends Component {
  _getPickerValue(data){
    obj = data.options.find(obj => obj.code === this.props.user[data.stateName]);
    return obj ? obj.label : 'គ្មានតម្លៃ';
  }

  render() {
    let props = this.props;
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.labelColor}>{ props.data.label }</Text>
        <IOSPicker
          mode='modal'
          selectedValue={ this._getPickerValue(props.data) }
          onValueChange={ props.onValueChange }>
          { props.data.options.map((obj, i) => {
            { return (<Picker.Item key={i} label={obj.label} value={obj.code} />) }
          }) }
        </IOSPicker>
      </View>
    )
  }
}

export default PickerSpecific;
