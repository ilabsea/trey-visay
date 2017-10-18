import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  AsyncStorage,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// Utils
import realm from '../schema';
import User from '../utils/user';

// Components
import BackgroundImage from '../components/image_background';
import Button from '../components/button';

// Source for form
// https://facebook.github.io/react/docs/forms.html
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
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
      User.setLogin(users[0].uuid);
      this.props.navigation.navigate('ProfileForm');
    } else {
      Alert.alert(
        'Incorrect username or password',
        'The username or passwrod you entered is incorrect. Please try atain.')
    }
  }

  render() {
    const isEnabled = this.state.username.length && this.state.password.length;
    const btnSubmitTextColor = isEnabled ? '#fff' : '#868686';

    return (
      <LinearGradient style={styles.container} colors={['#4B8FD3', '#1976d2']}>
        <BackgroundImage source={require('../assets/images/sign_in_bg.png')}>
          <ScrollView style={{padding: 24}}>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Image
                source={require('../assets/images/logo.png')}
                style={{width: 120, height: 120}}
              />

              <Text style={styles.title}>ត្រីវិស័យ</Text>
              <Text style={styles.subTitle}>បញ្ចូលគណនី</Text>
            </View>

            <View>
              <TextInput
                style={styles.inputText}
                onChangeText={this.handleUsernameChange.bind(this)}
                returnKeyType='next'
                placeholder='ឈ្មោះគណនី'
                placeholderTextColor='rgba(0,0,0,0.7)'
                autoCorrect={false}
                underlineColorAndroid='transparent'
                onSubmitEditing={() => this.passwordInput.focus()}
              />

              <TextInput
                style={styles.inputText}
                secureTextEntry={true}
                returnKeyType='go'
                placeholder='លេខសម្ងាត់'
                placeholderTextColor='rgba(0,0,0,0.7)'
                onChangeText={this.handlePasswordChange.bind(this)}
                underlineColorAndroid='transparent'
                ref={(input) => this.passwordInput = input}
              />

              <Button
                onPress={this.handleSubmit.bind(this)}
                disabled={!isEnabled}
                style={styles.btnLogin}>

                <Text style={[styles.loginText, {color: btnSubmitTextColor}]}>ចូលគណនី</Text>
              </Button>
            </View>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>មិនទាន់មានគណនីមែនទេ?</Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Register')}>
                <Text style={styles.btnRegister}>បង្កើតគណនី</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </BackgroundImage>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20
  },
  subTitle: {
    fontSize: 24,
    color: '#fff',
    marginVertical: 30
  },
  inputText: {
    height: 48,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5
  },
  registerText: {
    color: '#fff',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  btnRegister: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff'
  },
  loginText: {
    fontWeight: 'bold',
  },
  btnLogin: {
    marginTop: 24,
  }
})
