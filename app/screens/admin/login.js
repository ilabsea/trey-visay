import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
  NetInfo,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DeviceInfo from 'react-native-device-info';
import StatusBar from '../../components/status_bar';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { create } from 'apisauce';
import { environment } from '../../config/environment';

// Utils
import realm from '../../schema';
import User from '../../utils/user';
import uuidv4 from '../../utils/uuidv4';
import styles from '../../assets/style_sheets/login_form';

// Components
import BackgroundImage from '../../components/image_background';
import Button from '../../components/button';

const api = create({
  // baseURL: 'http://192.168.1.119:3000/api/v1'
  // baseURL: 'http://110.74.204.121:8090/api/v1'
  // baseURL: 'http://54.169.137.147/api/v1'
  baseURL: environment.apiUrl
})

export default class AdminLogin extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = { email: '', password: ''};
  }

  _handleInternetConnection() {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({isOnline: isConnected});
    });

    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleFirstConnectivityChange
    );
  }

  _handleFirstConnectivityChange = (isConnected) => {
    if (this.refs.adminLogin) {
      this.setState({isOnline: isConnected});
    }
  }

  componentWillMount() {
    this._handleInternetConnection();
  }

  handleSubmit(event) {
    if (!this.state.isOnline) {
      Alert.alert(
        'អ៊ីនធឺណេតមិនដំណើរការ',
        'ដើម្បីចូលគណនីគ្រប់គ្រងបាន តម្រូវឲ្យអ្នកភ្ជាប់អុីនធឺណេតជាមុនសិន។');
      return;
    }

    api.post('/accounts/sign_in', { account: { email: this.state.email, password: this.state.password } })
    .then((res) => {
      this._handleResponse(res);
    })
  }

  _handleResponse(res) {
    if (res.ok) {
      realm.write(() => {
        let user = realm.create('User', this.buildData(res), true);
        User.setLogin(user.uuid, () => {
          this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, actions: [{ type: 'Navigation/NAVIGATE', routeName:'AdminHome'}], key: null})
        });
      });

      return;
    }

    Alert.alert(
      'ការបញ្ចូលមិនត្រឹមត្រូវ',
      'អុីមែល ឬលេខសម្ងាត់ដែលអ្នកបានបញ្ចូលមិនត្រឹមត្រូវ។ សូមព្យាយាមម្តងទៀត។');
  }

  buildData(res) {
    let data = JSON.parse(res.config.data);
    let email = data.account.email;
    let password = data.account.password;
    let user = realm.objects('User').filtered('username="' + email + '"')[0];

    return {
      uuid: user && user.uuid || uuidv4(),
      fullName: email,
      username: email,
      password: password,
      token: res.data.auth_token,
      role: 'admin'
    };
  }

  _renderContent() {
    const isEnabled = this.state.email.length && this.state.password.length;
    const btnSubmitTextColor = isEnabled ? '#fff' : '#868686';

    return (
      <View style={{flex: 1}} ref='adminLogin'>
        <ScrollView style={{flex: 1}}>
          { this._renderBackTrigger() }

          <View style={{margin: 24}}>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Image
                source={require('../../assets/images/logo.png')}
                style={{width: 120, height: 120}}
              />

              <Text style={styles.title}>ត្រីវិស័យ</Text>
              <Text style={styles.subTitle}>បញ្ចូលគណនីជាអ្នកគ្រប់គ្រង</Text>
            </View>

            <View>
              <TextInput
                style={styles.inputText}
                onChangeText={(text) => this.setState({email: text})}
                returnKeyType='next'
                placeholder='អុីមែល'
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
          </View>
        </ScrollView>

        <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginRight: 24, marginBottom: 16}}>
          <Text style={styles.whiteLabel}>ជំនាន់: </Text>
          <Text style={styles.whiteLabel}>{DeviceInfo.getVersion()}</Text>
        </View>
      </View>
    )
  }

  _renderBackTrigger() {
    return (
      <TouchableOpacity style={styles.iconWrapper} onPress={ () => this.props.navigation.goBack() } >
        <MaterialIcon name='close' color='#1976d2' size={16}/>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <LinearGradient style={styles.container} colors={['#80d0c7', '#0093e8']}>
        <BackgroundImage source={require('../../assets/images/sign_in_bg.png')}>
          <StatusBar hidden={true} />

          { this._renderContent() }
        </BackgroundImage>
      </LinearGradient>
    )
  }
}
