import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import StatusBar from '../components/status_bar';

// Utils
import realm from '../schema';
import uuidv4 from '../utils/uuidv4';
import User from '../utils/user';
import styles from '../assets/style_sheets/login_form';

// Components
import BackgroundImage from '../components/image_background';
import Button from '../components/button';

export default class RegisterScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props)
    this.state = {
      uuid: uuidv4(),
      fullName: '',
      username: '',
      password: '',
      passwordConfirmation: ''
    }

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
        User.setLogin(this.state.uuid, ()=> {
          this.props.navigation.dispatch({type: 'Navigation/RESET', routeName: 'RegisterScreen', index: 0, actions: [{ type: 'Navigation/NAVIGATE', routeName:'ProfileForm'}], key: null})
        });

      });
    } catch (e) {
      console.log("Error on creation");
      alert('Fail to create user!');
    }
  }

  buildData() {
    return {
      uuid: this.state.uuid,
      fullName: this.state.fullName,
      username: this.state.username,
      password: this.state.password
    };
  }

  render() {
    const isEnabled = this.state.fullName.length &&
                      this.state.password.length &&
                      this.state.passwordConfirmation.length;
    const btnSubmitTextColor = isEnabled ? '#fff' : '#868686';

    return (
      <LinearGradient style={styles.container} colors={['#4B8FD3', '#1976d2']}>
        <BackgroundImage source={require('../assets/images/sign_in_bg.png')}>
          <StatusBar hidden={true} />

          <ScrollView>
            <View style={{padding: 24}}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Image
                  source={require('../assets/images/logo.png')}
                  style={{width: 120, height: 120}}
                />

                <Text style={styles.title}>ត្រីវិស័យ</Text>
                <Text style={styles.subTitle}>បង្កើតគណនី</Text>
              </View>

              <View>
                <Text style={styles.whiteLabel}>ឈ្មោះពេញ</Text>
                <TextInput
                  style={styles.inputText}
                  onChangeText={(text) => this.setState({fullName: text, username: text.split(' ').join('_')})}
                  value={this.state.fullName}
                  underlineColorAndroid='transparent'
                  onSubmitEditing={() => this.passwordInput.focus()}
                  returnKeyType='next' />

                <Text style={styles.whiteLabel}>ឈ្មោះគណនី</Text>
                <TextInput
                  style={[styles.inputText, {backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff'}]}
                  value={this.state.username}
                  editable={false}
                  underlineColorAndroid='transparent'
                  onSubmitEditing={() => this.passwordInput.focus()}
                  returnKeyType='next' />

                <Text style={styles.whiteLabel}>លេខសម្ងាត់</Text>
                <TextInput
                  style={styles.inputText}
                  secureTextEntry={true}
                  onChangeText={(text) => this.setState({password: text})}
                  value={this.state.password}
                  ref={(input) => this.passwordInput = input}
                  onSubmitEditing={() => this.passwordConfirmationInput.focus()}
                  underlineColorAndroid='transparent'
                  returnKeyType='next' />

                <Text style={styles.whiteLabel}>វាយលេខសម្ងាត់ម្តងទៀត</Text>
                <TextInput
                  style={styles.inputText}
                  secureTextEntry={true}
                  onChangeText={(text) => this.setState({passwordConfirmation: text})}
                  value={this.state.passwordConfirmation}
                  ref={(input) => this.passwordConfirmationInput = input}
                  underlineColorAndroid='transparent'
                  returnKeyType='done' />
              </View>

              <View style={styles.submitWrapper}>
                <Button
                  style={styles.btnSubmit}
                  onPress={this.handleSubmit.bind(this)}
                  disabled={!isEnabled} >
                  <Text style={[styles.submitText, {color: btnSubmitTextColor}]}>ចុះឈ្មោះ</Text>
                </Button>
              </View>

              <View style={styles.row}>
                <Text style={styles.whiteLabel}>មានគណនីរួចហើយមែនទេ?</Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}>
                  <Text style={styles.linkText}>បញ្ចូលគណនី</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </BackgroundImage>
      </LinearGradient>
    )
  }
}
