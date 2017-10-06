import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  Button,
  Alert,
} from 'react-native';

import realm from '../schema';
import uuidv4 from '../utils/uuidv4';

class Register extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack } = navigation;

    return {
      title: 'បង្កើតគណនី Trey Visay',
      headerRight: <Button title="Sign In" onPress={() => goBack()} />,
    };
  };

  constructor(props) {
    super(props)
    this.state = {
      fullName: '',
      username: '',
      password: '',
      passwordConfirmation: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.buildData = this.buildData.bind(this);
  }

  componentWillMount() {
    // alert(JSON.stringify(realm.objects('User')));
  }

  handleSubmit() {
    if (this.state.password !== this.state.passwordConfirmation) {
      Alert.alert(
        'Incorrect password',
        "Password confirm doesn't match password.")
      return;
    }

    try {
      realm.write(() => {
        realm.create('User', this.buildData());
        this.props.navigation.navigate('ProfileForm');

      });
    } catch (e) {
      console.log("Error on creation");
      alert('Fail to create user!');
    }
  }

  buildData() {
    return {
      uuid: uuidv4(),
      fullName: this.state.fullName,
      username: this.state.username,
      password: this.state.password
    };
  }

  render() {
    const isEnabled = this.state.fullName.length &&
                      this.state.password.length &&
                      this.state.passwordConfirmation.length;
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.leftColumn}>
            <Text style={styles.inputLabel}>Full name</Text>
            <TextInput
              style={styles.inputText}
              onChangeText={(text) => this.setState({fullName: text, username: text.split(' ').join('_')})}
              value={this.state.fullName}
              underlineColorAndroid='transparent'
              onSubmitEditing={() => this.passwordInput.focus()}
              returnKeyType='next'
            />

            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.inputText}
              secureTextEntry={true}
              onChangeText={(text) => this.setState({password: text})}
              value={this.state.password}
              ref={(input) => this.passwordInput = input}
              onSubmitEditing={() => this.passwordConfirmationInput.focus()}
              returnKeyType='next'
            />

            <Text style={styles.inputLabel}>Confirm password</Text>
            <TextInput
              style={styles.inputText}
              secureTextEntry={true}
              onChangeText={(text) => this.setState({passwordConfirmation: text})}
              value={this.state.passwordConfirmation}
              ref={(input) => this.passwordConfirmationInput = input}
              returnKeyType='done'
            />
          </View>

          <View style={styles.rightColumn}>
            <Text style={styles.inputLabel}>User name</Text>
            <TextInput
              value={this.state.username}
              editable={false}
              underlineColorAndroid='rgba(0,0,0,0.7)'
            />
          </View>
        </View>

        <View style={styles.submitWrapper}>
          <Button
            style={styles.submit}
            onPress={this.handleSubmit}
            title="Register"
            accessibilityLabel="Create Account"
            disabled={!isEnabled}
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
    backgroundColor: '#1abc9c',
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
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: 10,
    color: '#fff',
  },
  inputLabel: {
    color: '#fff',
    fontWeight: 'bold'
  }
})

export default Register;
