import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  Alert,
  TouchableOpacity,
} from 'react-native';

import realm from '../schema';

// Source for form
// https://facebook.github.io/react/docs/forms.html

class Login extends Component {
  static navigationOptions = {
    title: 'Trey Visay',
  };

  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    // alert(realm.objects('User').length);
  }

  handleUsernameChange(text) {
    this.setState({username: text});
  }

  handlePasswordChange(text) {
    this.setState({password: text});
  }

  handleSubmit(event) {
    let users = realm.objects('User').filtered('username="' + this.state.username + '" AND password="' + this.state.password + '"');
    if (!!users.length) {
      this.props.navigation.navigate('ProfileForm');
      return;
    }

    let usernames = realm.objects('User').filtered('username="' + this.state.username + '"');
    if (!!usernames.length) {
      Alert.alert(
        'Incorrect password',
        'The passwrod you entered is incorrect. Please try atain.')
    } else {
      Alert.alert(
        'Incorrect username',
        "The username you entered doesn't appear to belong to an account. Please check your username and try again.")
    }

    // if (this.state.username == 'sokly' && this.state.password == '123456') {
    //   this.props.navigation.navigate('ProfileForm');
    // } else {
    //   alert('your username and password is invalid');
    // }
  }

  render() {
    const { navigate } = this.props.navigation;
    const isEnabled = this.state.username.length && this.state.password.length;

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <View style={{flexGrow: 1}}>
          <View style={{marginTop: 16, marginBottom: 16}}>
            <Text style={styles.subTitle}>Sign In</Text>
            <Text style={{color: '#fff'}}>to continue to Trey Visay</Text>
          </View>

          <TextInput
            style={styles.inputText}
            onChangeText={this.handleUsernameChange}
            returnKeyType='next'
            placeholder='Username'
            placeholderTextColor='rgba(255,255,255,0.7)'
            autoCorrect={false}
            underlineColorAndroid='transparent'
            onSubmitEditing={() => this.passwordInput.focus()}
          />

          <TextInput
            style={styles.inputText}
            secureTextEntry={true}
            returnKeyType='go'
            placeholder='Password'
            placeholderTextColor='rgba(255,255,255,0.7)'
            onChangeText={this.handlePasswordChange}
            ref={(input) => this.passwordInput = input}
          />

          <Button
            onPress={this.handleSubmit}
            title="Login"
            accessibilityLabel="Next to continue login"
            disabled={!isEnabled}
          />
        </View>

        <View>
          <TouchableOpacity
            style={styles.btnRegister}
            onPress={() => navigate('Register')}>
            <Text style={{fontSize: 16, color: '#fff'}}>Create New Trey Visay Account</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: '#1abc9c',
  },
  subTitle: {
    fontSize: 16,
    color: '#fff'
  },
  inputText: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#fff',
  },
  btnRegister: {
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 24
  }
})

export default Login;
