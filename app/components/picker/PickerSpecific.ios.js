import React, {Component} from 'react';
import {
  Text,
  View
} from 'react-native';
import IOSPicker from 'react-native-ios-picker';
import styles from '../../assets/style_sheets/profile_form';

class PickerSpecific extends Component {
  _getPickerValue(data){
    obj = data.options.find(obj => obj.value === this.props.user[data.stateName]);
    return obj.label;
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
            { return (<IOSPicker.Item key={i} label={obj.label} value={obj.value} />) }
          }) }
        </IOSPicker>
      </View>
    )
  }
}

export default PickerSpecific;
