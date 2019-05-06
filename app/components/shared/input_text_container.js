import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Platform
} from 'react-native';

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
      <View>
        <TextInput
          style={styles.input}
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

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#DCDCDC',
    marginBottom: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40
  },
  errorText: {
    color: 'rgb(221,44,0)',
    fontSize: 12
  }
})

export default InputTextContainer;
