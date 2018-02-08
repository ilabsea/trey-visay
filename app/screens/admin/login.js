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
import SettingsList from 'react-native-settings-list';
import { create } from 'apisauce';

// Utils
import realm from '../../schema';
import User from '../../utils/user';
import styles from '../../assets/style_sheets/login_form';

// Components
import BackgroundImage from '../../components/image_background';
import Button from '../../components/button';

const api = create({
  baseURL: 'http://192.168.1.118:3000/api/v1',
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

    api.post('/accounts/sign_in', { user: { email: this.state.email, password: this.state.password } })
    .then((res) => {
      this._handleResponse(res);
    })
  }

  _handleResponse(res) {
    if (res.ok) {
      User.setToken(res.data.auth_token);
      return this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, actions: [{ type: 'Navigation/NAVIGATE', routeName:'AdminHome'}], key: null})
    }

    Alert.alert(
      'ការបញ្ចូលមិនត្រឹមត្រូវ',
      'អុីមែល ឬលេខសម្ងាត់ដែលអ្នកបានបញ្ចូលមិនត្រឹមត្រូវ។ សូមព្យាយាមម្តងទៀត។');
  }

  _renderContent() {
    const isEnabled = this.state.email.length && this.state.password.length;
    const btnSubmitTextColor = isEnabled ? '#fff' : '#868686';

    return (
      <View style={{flex: 1}} ref='adminLogin'>
        <ScrollView style={{flex: 1}}>
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

  _renderSetting() {
    return (
      <View style={{backgroundColor:'gray'}}>
        <View style={{}}>
          <SettingsList>
            <SettingsList.Header headerText='គណនី' headerStyle={{color:'white'}}/>
            <SettingsList.Item title='គណនីទូទៅ' onPress={() => this.props.navigation.goBack()}/>
          </SettingsList>
        </View>
      </View>
    )
  }

  render() {
    return (
      <LinearGradient style={styles.container} colors={['#4B8FD3', '#1976d2']}>
        <BackgroundImage source={require('../../assets/images/sign_in_bg.png')}>
          <StatusBar hidden={true} />

          { this._renderContent() }
          { false && this._renderSetting() }
        </BackgroundImage>
      </LinearGradient>
    )
  }
}
