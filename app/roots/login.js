import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  Button
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
    this.state = { userName: '' };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    // alert(realm.objects('User').length);
  }

  handleUsernameChange(text) {
    this.setState({userName: text});
  }

  handlePasswordChange(text) {
    this.setState({password: text});
  }

  handleSubmit(event) {
    if (!this.state.userName || !this.state.password) {
      alert('please filling the user name and password');
      return;
    }

    let users = realm.objects('User').filtered('userName="' + this.state.userName + '" AND password="' + this.state.password + '"');
    if (!!users.length) {
      this.props.navigation.navigate('ProfileForm');
    } else {
      alert('your username and password is invalid');
    }

    // if (this.state.userName == 'sokly' && this.state.password == '123456') {
    //   this.props.navigation.navigate('ProfileForm');
    // } else {
    //   alert('your username and password is invalid');
    // }
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={{marginTop: 16, marginBottom: 16}}>
          <Text style={styles.subTitle}>Sign In</Text>
          <Text>to continue to Trey Visay</Text>
        </View>

        <Text style={styles.inputLabel}>Name</Text>
        <TextInput
          style={styles.inputText}
          onChangeText={this.handleUsernameChange}
          value={this.state.userName}
        />

        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.inputText}
          secureTextEntry={true}
          onChangeText={this.handlePasswordChange}
        />

        <Button
          style={styles.createAccount}
          onPress={this.handleSubmit}
          title="Submit"
          accessibilityLabel="Next to continue login"
        />

        <Button
          style={styles.createAccount}
          onPress={() => navigate('Register')}
          title="Create New Trey Visay Account"
          accessibilityLabel="Next to continue login"
        />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  signIn: {
    marginTop: 40
  },
  createAccount: {
    alignSelf: 'flex-end',
    backgroundColor: 'transparent'
  },
  container: {
    padding: 24,
    flex: 1,
    flexDirection: 'column'
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  subTitle: {
    fontSize: 16
  },
  inputText: {
    height: 40,
    paddingLeft: 5,
    paddingRight: 5
  },
  inputLabel: {

  }
})

export default Login;
