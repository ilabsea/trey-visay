import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Alert,
  ToastAndroid,
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
import StatusBar from '../components/status_bar';

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

  componentWillMount() {
    let user = realm.objects('User').filtered('uuid="' + User.getID() + '"')[0];

    this.state = {
      oldPassword: '',
      newPassword: '',
      passwordConfirmation: '',
      user: user
    };
  }

  handleSubmit() {
    if (!this._isValid()) {
      Alert.alert( 'ខុសលេខសម្ងាត់', 'ការបញ្ចូលមិនត្រឹមត្រូវ' );
      return;
    }

    realm.write(() => {
      realm.create('User', { password: this.state.newPassword, uuid: User.getID() }, true);
      ToastAndroid.show('រក្សាទុកលេខសម្ងាត់ដោយជោគជ័យ!', ToastAndroid.LONG);
      this.props.navigation.navigate('Dashboard');
    });
  }

  _isValid() {
    return (
      (!!this.state.oldPassword.length && !!this.state.newPassword.length && !!this.state.passwordConfirmation.length) &&
      (this.state.user.password == this.state.oldPassword && this.state.newPassword == this.state.passwordConfirmation)
    )
  }

  render() {
    const isEnabled = this.state.newPassword.length &&
                      this.state.passwordConfirmation.length;
    const btnSubmitTextColor = isEnabled ? '#fff' : '#868686';

    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={styles.container}>
          <StatusBar />
          <Toolbar
            leftElement="close"
            centerElement={<Text style={[headerStyles.headerTitleStyle, {marginLeft: 0}]}>ប្តូរលេខសម្ងាត់</Text>}
            onLeftElementPress={() => this.props.navigation.goBack()}
          />

          <ScrollView>
            <View style={[styles.scrollContainer, {margin: 16}]}>
              <View style={shareStyles.box}>
                <Text>វាយបញ្ចូលលេខសម្ងាត់ចាស់</Text>
                <TextInput
                  secureTextEntry={true}
                  onChangeText={(text) => this.setState({oldPassword: text})}
                  value={this.state.oldPassword}
                  onSubmitEditing={() => this.passwordInput.focus()}
                  returnKeyType='next' />

                <Text>វាយបញ្ចូលលេខសម្ងាត់ថ្មី</Text>
                <TextInput
                  secureTextEntry={true}
                  onChangeText={(text) => this.setState({newPassword: text})}
                  value={this.state.newPassword}
                  ref={(input) => this.passwordInput = input}
                  onSubmitEditing={() => this.passwordConfirmationInput.focus()}
                  returnKeyType='next' />

                <Text>វាយបញ្ចូលលេខសម្ងាត់ថ្មីម្តងទៀត</Text>
                <TextInput
                  secureTextEntry={true}
                  onChangeText={(text) => this.setState({passwordConfirmation: text})}
                  value={this.state.passwordConfirmation}
                  ref={(input) => this.passwordConfirmationInput = input}
                  returnKeyType='done' />

                <View style={styles.submitWrapper}>
                  <Button
                    style={[styles.btnSubmit, {paddingHorizontal: 16}]}
                    onPress={this.handleSubmit.bind(this)}
                    disabled={!isEnabled} >
                    <Text style={[styles.submitText, {color: btnSubmitTextColor}]}>យល់ព្រម</Text>
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
