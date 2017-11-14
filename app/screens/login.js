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
import SplashScreen from 'react-native-splash-screen'

// Utils
import realm from '../schema';
import User from '../utils/user';
import styles from '../assets/style_sheets/login_form';

// Components
import BackgroundImage from '../components/image_background';
import Button from '../components/button';

// Source for form
// https://facebook.github.io/react/docs/forms.html
export default class Login extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = { username: '', password: '', loaded: false };
  }

  componentWillMount() {
    SplashScreen.hide();
    User.isLoggedin(this.handleUser.bind(this));
  }

  isUserInfoCompleted() {
    let users = realm.objects('User').filtered('uuid="' + User.getID() + '"');

    return !!users.length && !!users[0].dateOfBirth;
  }

  handleUser(userId) {
    if (!userId) {
      return this.setState({loaded: true});
    }

    if (this.isUserInfoCompleted()) {
      return this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, actions: [{ type: 'Navigation/NAVIGATE', routeName:'Home'}]})
    }

    this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, actions: [{ type: 'Navigation/NAVIGATE', routeName:'ProfileForm'}]})
  }

  handleUsernameChange(text) {
    this.setState({username: text});
  }

  handlePasswordChange(text) {
    this.setState({password: text});
  }

  handleSubmit(event) {
    let users = realm.objects('User').filtered('username="' + this.state.username + '" AND password="' + this.state.password + '"');
    if (!users.length) {
      return Alert.alert(
        'Incorrect username or password',
        'The username or passwrod you entered is incorrect. Please try atain.');
    }

    User.setLogin(users[0].uuid, ()=>{
      if (!!users[0].dateOfBirth) {
        return this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, actions: [{ type: 'Navigation/NAVIGATE', routeName:'Home'}]})
      }

      this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, actions: [{ type: 'Navigation/NAVIGATE', routeName:'ProfileForm'}]})
    });
  }

  render() {
    const isEnabled = this.state.username.length && this.state.password.length;
    const btnSubmitTextColor = isEnabled ? '#fff' : '#868686';

    if (!this.state.loaded) {
      return (null)
    }

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

                <Text style={[styles.submitText, {color: btnSubmitTextColor}]}>ចូលគណនី</Text>
              </Button>
            </View>

            <View style={styles.row}>
              <Text style={styles.whiteLabel}>មិនទាន់មានគណនីមែនទេ?</Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Register')}>
                <Text style={styles.linkText}>បង្កើតគណនី</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </BackgroundImage>
      </LinearGradient>
    )
  }
}
