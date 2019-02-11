import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Platform
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import styles from '../assets/style_sheets/profile_form';

class InputTextContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let errorElements = !!this.props.errors && this.props.errors.map((message, i) => {
      return <Text key={i} style={styles.errorText}>{message}</Text>
    })

    const { ...props} = this.props;

    return (
      <View style={styles.inputContainer}>
        <TextField
          baseColor="rgba(0, 0, 0, 1)"
          tintColor="black"
          label={this.props.label}
          labelFontSize={16}
          labelHeight={10}
          labelPadding={12}
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
