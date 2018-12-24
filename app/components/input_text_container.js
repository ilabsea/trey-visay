import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform
} from 'react-native';
import InputField from './input_field';

class InputTextContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let errorElements = !!this.props.errors && this.props.errors.map((message, i) => {
      return <Text key={i} style={styles.errorText}>{message}</Text>
    })

    const {style, ...props} = this.props;

    return (
      <View style={[styles.inputContainer, style]}>
        <Text style={styles.inputLabel}>{this.props.name}</Text>
        <InputField
          underlineColorAndroid='rgba(0,0,0,0.7)'
          style={ styles.inputText }
          onChangeText={ this.props.onChangeText }
          keyboardType={ this.props.keyboardType || 'default'}
          value={ this.props.value }
          ref={ this.props.inputRef }
          { ...props }
        />
        {errorElements}
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
  errorText: {
    color: 'rgb(221,44,0)',
    fontSize: 12
  },
  inputLabel: {
    color: 'rgba(0,0,0,0.5)',
  },
})

export default InputTextContainer;
