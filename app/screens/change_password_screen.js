import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TextInput
} from 'react-native';

import {
  ThemeProvider,
  Toolbar,
  Icon,
} from 'react-native-material-ui';

import Button from '../components/button';
import headerStyles from '../assets/style_sheets/header';
import shareStyles from '../assets/style_sheets/profile_form';
import styles from '../assets/style_sheets/login_form';

import realm from '../schema';
import User from '../utils/user';

const uiTheme = {
  palette: {
    primaryColor: '#1976d2',
  }
};

export default class ChangePasswordScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'ប្តូរលេខសម្ងាត់',
    drawerIcon: ({ tintColor }) => (
      <ThemeProvider uiTheme={{}}>
        <Icon name="key" color={tintColor} />
      </ThemeProvider>
    ),
  };

  state = {
    password: '',
    passwordConfirmation: ''
  };

  handleSubmit() {
    if (this.state.password !== this.state.passwordConfirmation) {
      Alert.alert(
        'Incorrect password',
        "Password confirm doesn't match password.")
      return;
    }

    realm.write(() => {
      realm.create('User', { password: this.state.password, uuid: User.getID() }, true);
      alert('update password successfully!')
    });
  }

  render() {
    const isEnabled = this.state.password.length &&
                      this.state.passwordConfirmation.length;
    const btnSubmitTextColor = isEnabled ? '#fff' : '#868686';

    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={styles.container}>
          <Toolbar
            leftElement="menu"
            centerElement={<Text style={[headerStyles.headerTitleStyle, {marginLeft: 0}]}>ប្តូរលេខសម្ងាត់</Text>}
            onLeftElementPress={() => this.props.navigation.navigate('DrawerOpen')}
          />

          <ScrollView>
            <View style={[styles.scrollContainer, {margin: 16}]}>
              <View style={shareStyles.box}>
                <Text style={{}}>លេខសម្ងាត់ថ្មី</Text>

                <View>
                  <TextInput
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({password: text})}
                    value={this.state.password}
                    ref={(input) => this.passwordInput = input}
                    onSubmitEditing={() => this.passwordConfirmationInput.focus()}
                    returnKeyType='next' />

                  <Text style={{}}>វាយលេខសម្ងាត់ម្តងទៀត</Text>
                  <TextInput
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({passwordConfirmation: text})}
                    value={this.state.passwordConfirmation}
                    ref={(input) => this.passwordConfirmationInput = input}
                    returnKeyType='done' />
                </View>

                <View style={[styles.submitWrapper, {flexDirection: 'row', justifyContent: 'center'}]}>
                  <Button
                    style={[styles.btnSubmit, {paddingHorizontal: 16}]}
                    onPress={this.handleSubmit.bind(this)}
                    disabled={!isEnabled} >
                    <Text style={[styles.submitText, {color: btnSubmitTextColor}]}>រក្សាទុកការផ្លាស់ប្តូរ</Text>
                  </Button>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </ThemeProvider>
    )
  }
}
