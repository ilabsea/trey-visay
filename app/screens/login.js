import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SplashScreen from 'react-native-splash-screen';
import DeviceInfo from 'react-native-device-info';
import StatusBar from '../components/status_bar';
import SettingsList from 'react-native-settings-list';

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

  isUserInfoCompleted(user) {
    return !!user && !!user.dateOfBirth;
  }

  handleUser(userId) {
    if (!userId) {
      return this.setState({loaded: true});
    }

    let user = realm.objects('User').filtered('uuid="' + userId + '"')[0];

    if (!user) {
      User.logout();
      return this.setState({loaded: true});
    }

    // Only admin user has token
    if (!!user.token) {
      return this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, actions: [{ type: 'Navigation/NAVIGATE', routeName:'AdminHome'}], key: null})
    }

    if (this.isUserInfoCompleted(user)) {
      return this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, actions: [{ type: 'Navigation/NAVIGATE', routeName:'Home'}]})
    }

    this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, actions: [{ type: 'Navigation/NAVIGATE', routeName:'ProfileForm'}]})
  }

  handleSubmit(event) {
    let user = realm.objects('User').filtered('username="' + this.state.username + '" AND password="' + this.state.password + '"')[0];
    if (!user || user.role == 'admin') {
      return Alert.alert(
        'ការបញ្ចូលមិនត្រឹមត្រូវ',
        'ឈ្មោះគណនី ឬលេខសម្ងាត់ដែលអ្នកបានបញ្ចូលមិនត្រឹមត្រូវ។ សូមព្យាយាមម្តងទៀត។');
    }

    User.setLogin(user.uuid, ()=>{
      if (!!user.dateOfBirth) {
        return this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, actions: [{ type: 'Navigation/NAVIGATE', routeName:'Home'}]})
      }

      this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, actions: [{ type: 'Navigation/NAVIGATE', routeName:'ProfileForm'}]})
    });
  }

  _renderContent() {
    const isEnabled = this.state.username.length && this.state.password.length;
    const btnSubmitTextColor = isEnabled ? '#fff' : '#868686';

    return (
      <View style={{flexDirection: 'column', flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View style={{margin: 24}}>
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
                onChangeText={(text) => this.setState({username: text})}
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
                onChangeText={(text) => this.setState({password: text})}
                underlineColorAndroid='transparent'
                ref={(input) => this.passwordInput = input}
              />

              <Button
                onPress={ () => isEnabled && this.handleSubmit() }
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
          </View>
        </ScrollView>

        <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginRight: 24, marginBottom: 16}}>
          <Text style={styles.whiteLabel}>ជំនាន់: </Text>
          <Text style={styles.whiteLabel}>{DeviceInfo.getVersion()}</Text>
        </View>
      </View>
    )
  }

  _renderSetting() {
    return (
      <View style={{backgroundColor:'gray'}}>
        <View style={{}}>
          <SettingsList>
            <SettingsList.Header headerText='គណនី' headerStyle={{color:'white'}}/>
            <SettingsList.Item title='គណនីអ្នកគ្រប់គ្រង' onPress={() => this.props.navigation.navigate('AdminLogin')}/>
          </SettingsList>
        </View>
      </View>
    )
  }

  render() {
    if (!this.state.loaded) {
      return (null)
    }

    return (
      <LinearGradient style={styles.container} colors={['#4B8FD3', '#1976d2']}>
        <BackgroundImage source={require('../assets/images/sign_in_bg.png')}>
          <StatusBar hidden={true} />

          { this._renderContent() }
          { false && this._renderSetting() }
        </BackgroundImage>
      </LinearGradient>
    )
  }
}
