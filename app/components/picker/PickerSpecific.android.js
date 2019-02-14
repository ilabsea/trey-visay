import React, {Component} from 'react';
import {
  Text,
  View,
  Picker
} from 'react-native';
import styles from '../../assets/style_sheets/profile_form';

class PickerSpecific extends Component {
  _getPickerValue(data) {
    return this.props.user[data.stateName];
  }

  render() {
    let props = this.props;
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.labelColor}>{ props.data.label }</Text>
        <Picker
          mode='dialog'
          prompt='សូមជ្រេីសរេីស'
          selectedValue={ this._getPickerValue(props.data) }
          onValueChange={ props.onValueChange}>
          { props.data.options.map((obj, i) => {
            { return (<Picker.Item key={i} label={obj.label} value={obj.code} />) }
            })
          }
        </Picker>
      </View>
    )
  }
}

export default PickerSpecific;
