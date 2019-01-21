import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';
import InputField from './input_field';
import styles from '../assets/style_sheets/profile_form';

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
          inputRef={this.props.inputRef}
          {...props}
        />
        {errorElements}
      </View>
    );
  }
}

export default InputTextContainer;
