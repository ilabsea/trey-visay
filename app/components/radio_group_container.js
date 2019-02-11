import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

import RadioGroup from './radio_group';

class RadioGroupContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.radioTitle}>{this.props.label}</Text>
        <RadioGroup
          options={this.props.options}
          onPress={(this.props.onPress).bind(this)}
          value={this.props.value}
        >
        </RadioGroup>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    padding: 2,
    marginTop: 18,
    marginBottom: 18,
    maxWidth: 500
  },
  radioTitle: {
    marginBottom: 10,
    color: 'black'
  }
})

export default RadioGroupContainer;
