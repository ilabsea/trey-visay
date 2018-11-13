import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import StatusBar from '../components/status_bar';

// Utils
import realm from '../schema';
import uuidv4 from '../utils/uuidv4';
import User from '../utils/user';
import styles from '../assets/style_sheets/login_form';

// Components
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

  handleSubmit() {
    if (this.state.password !== this.state.passwordConfirmation) {
      return Alert.alert(
        'ការបញ្ចូលពាក្យសម្ងាត់មិនត្រឹមត្រូវ',
        "ការបញ្ជាក់ពាក្យសម្ងាត់មិនត្រូវគ្នានឹងពាក្យសម្ងាត់ទេ។");
    }

    let user = realm.objects('User').filtered('username="' + this.state.username + '"')[0];
    if (!!user) {
      return Alert.alert(
        'គណនីមានរួចហើយ',
        "ឈ្មោះគណនីធ្លាប់មានរួចមកហើយ សូមប្តូរឈ្មោះគណនីម្តងទៀត។");
    }
    try {
      realm.write(() => {
        realm.create('User', this.buildData());
        User.setLogin(this.state.uuid, ()=> {
          this.props.navigation.dispatch({type: 'Navigation/RESET', routeName: 'RegisterScreen', index: 0, actions: [{ type: 'Navigation/NAVIGATE', routeName:'ProfileForm'}], key: null})
        });

      });
    } catch (e) {
      console.log('===========Error on creation', e);
      alert('Fail to create user!');
    }
  }

  buildData() {
    return {
      uuid: this.state.uuid,
      fullName: this.state.username,
      username: this.state.username,
      password: this.state.password
    };
  }

  render() {
    const isEnabled = this.state.password.length && this.state.passwordConfirmation.length;
    const btnSubmitTextColor = isEnabled ? '#fff' : '#868686';

    return (
      <LinearGradient style={styles.container} colors={['#80d0c7', '#0093e8']}>
        <ImageBackground source={require('../assets/images/sign_in_bg.png')} style={{width: '100%', height: '100%'}}>
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
                <Text style={styles.whiteLabel}>ឈ្មោះគណនី</Text>
                <TextInput
                  style={styles.inputText}
                  onChangeText={(text) => this.setState({username: text})}
                  value={this.state.username}
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
        </ImageBackground>
      </LinearGradient>
    )
  }
}
