import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  Button
} from 'react-native';

class Register extends Component {
  static navigationOptions = {
    title: 'បង្កើតគណនី Trey Visay',
  };

  constructor(props) {
    super(props)
    this.state = {
      fullName: '',
      userName: '',
      password: '',
      confirmPassword: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    alert('handleSubmit');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.leftColumn}>
            <Text style={styles.inputLabel}>Full name</Text>
            <TextInput
              style={styles.inputText}
              onChangeText={(text) => this.setState({fullName: text})}
              value={this.state.fullName}
            />

            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.inputText}
              secureTextEntry={true}
              onChangeText={(text) => this.setState({password: text})}
              value={this.state.password}
            />

            <Text style={styles.inputLabel}>Confirm password</Text>
            <TextInput
              style={styles.inputText}
              secureTextEntry={true}
              onChangeText={(text) => this.setState({confirmPassword: text})}
              value={this.state.confirmPassword}
            />
          </View>

          <View style={styles.rightColumn}>
            <Text style={styles.inputLabel}>User name</Text>
            <TextInput
              style={styles.inputText}
              value={this.state.fullName.split(' ').join('_')}
              editable={false}
            />
          </View>
        </View>

        <View style={styles.submitWrapper}>
          <Button
            style={styles.submit}
            onPress={this.handleSubmit}
            title="Submit"
            accessibilityLabel="Create Account"
          />
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row'
  },
  leftColumn: {
    flex: 2
  },
  rightColumn: {
    flex: 1,
    paddingLeft: 20
  },
  submitWrapper: {
    marginTop: 40
  },
  inputText: {
    height: 40,
    paddingLeft: 5,
    paddingRight: 5
  },
})

export default Register;
