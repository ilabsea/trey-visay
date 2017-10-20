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

// Utils
import realm from '../schema';
import uuidv4 from '../utils/uuidv4';
import User from '../utils/user';

// Components
import BackgroundImage from '../components/image_background';
import Button from '../components/button';

class Register extends Component {
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
          this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, actions: [{ type: 'Navigate', routeName:'ProfileForm'}]})
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
          <ScrollView>
            <View style={{padding: 24}}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Image
                  source={require('../assets/images/logo.png')}
                  style={{width: 120, height: 120}}
                />

                <Text style={styles.title}>ត្រីវិស័យ</Text>
                <Text style={styles.subTitle}>បញ្ចូលគណនី</Text>
              </View>

              <View>
                  <Text style={styles.inputLabel}>ឈ្មោះពេញ</Text>
                  <TextInput
                    style={styles.inputText}
                    onChangeText={(text) => this.setState({fullName: text, username: text.split(' ').join('_')})}
                    value={this.state.fullName}
                    underlineColorAndroid='transparent'
                    onSubmitEditing={() => this.passwordInput.focus()}
                    returnKeyType='next'
                  />

                  <Text style={styles.inputLabel}>ឈ្មោះគណនី</Text>
                  <TextInput
                    style={[styles.inputText, {backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff'}]}
                    value={this.state.username}
                    editable={false}
                    underlineColorAndroid='transparent'
                    onSubmitEditing={() => this.passwordInput.focus()}
                    returnKeyType='next'
                  />

                  <Text style={styles.inputLabel}>លេខសម្ងាត់</Text>
                  <TextInput
                    style={styles.inputText}
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({password: text})}
                    value={this.state.password}
                    ref={(input) => this.passwordInput = input}
                    onSubmitEditing={() => this.passwordConfirmationInput.focus()}
                    returnKeyType='next'
                  />

                  <Text style={styles.inputLabel}>វាយលេខសម្ងាត់ម្តងទៀត</Text>
                  <TextInput
                    style={styles.inputText}
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({passwordConfirmation: text})}
                    value={this.state.passwordConfirmation}
                    ref={(input) => this.passwordConfirmationInput = input}
                    returnKeyType='done'
                  />
              </View>

              <View style={styles.submitWrapper}>
                <Button
                  style={styles.btnSubmit}
                  onPress={this.handleSubmit.bind(this)}
                  disabled={!isEnabled}
                >
                  <Text style={[styles.loginText, {color: btnSubmitTextColor}]}>ចុះឈ្មោះ</Text>
                </Button>
              </View>

              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>មានគណនីមែនទេ?</Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}>
                  <Text style={styles.btnLogin}>ចូលគណនី</Text>
                </TouchableOpacity>
              </View>
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
    backgroundColor: '#1abc9c',
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
  submitWrapper: {
    marginTop: 24
  },
  inputText: {
    height: 48,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  inputLabel: {
    color: '#fff',
    fontWeight: 'bold'
  },
  loginText: {
    color: '#fff',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  btnLogin: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
  btnSubmit: {
  }
})

export default Register;
