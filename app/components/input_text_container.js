import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';

class InputTextContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>{this.props.label}</Text>
        <TextInput
          style={ styles.inputText }
          onChangeText={ this.props.onChangeText }
          keyboardType={ this.props.keyboardType || 'default'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    padding: 2,
    marginTop: 18,
    marginBottom: 18
  },
  inputText: {
    height: 40,
    paddingLeft: 5,
    paddingRight: 5
  },
  inputLabel: {

  }
})

export default InputTextContainer;
