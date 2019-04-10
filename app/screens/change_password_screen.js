import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Platform
} from 'react-native';

import Toast, { DURATION } from 'react-native-easy-toast';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import Button from '../components/button';
import InputTextContainer from '../components/input_text_container';
import shareStyles from '../assets/style_sheets/profile_form';
import styles from '../assets/style_sheets/login_form';
import StatusBar from '../components/shared/status_bar';

import realm from '../schema';
import User from '../utils/user';

export default class ChangePasswordScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    drawerLabel: 'ប្តូរលេខសម្ងាត់',
    drawerIcon: ({ tintColor }) => (
      <MaterialIcon name="key" color={tintColor} />
    )
  });

  constructor(props) {
    super(props);

    this.state = {
      oldPassword: '',
      newPassword: '',
      passwordConfirmation: '',
      user: null
    }
  }

  componentWillMount() {
    let user = User.getCurrent();
    this.setState({ user: user });
  }

  handleSubmit() {
    if (!this._isValid()) {
      Alert.alert( 'ខុសលេខសម្ងាត់', 'ការបញ្ចូលមិនត្រឹមត្រូវ' );
      return;
    }

    realm.write(() => {
      realm.create('User', { password: this.state.newPassword, uuid: User.getID() }, true);
      this.refs.toast.show('រក្សាទុកលេខសម្ងាត់ដោយជោគជ័យ!', DURATION.LONG);
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
    const isEnabled = this.state.oldPassword.length && this.state.newPassword.length &&
                      this.state.passwordConfirmation.length;
    const btnSubmitTextColor = isEnabled ? '#fff' : '#868686';
    const btnSubmitColor = isEnabled ? '#4caf50' : '#d9d9d9';

    return (
      <View style={styles.container}>
        <StatusBar />

        <ScrollView style={{flex:1, backgroundColor: '#fff', padding: 16}}>
          <InputTextContainer
            label='វាយបញ្ចូលលេខសម្ងាត់ចាស់'
            placeholder='វាយបញ្ចូលលេខសម្ងាត់ចាស់នៅទីនេះ'
            secureTextEntry={true}
            onChangeText={(text) => this.setState({oldPassword: text})}
            value={this.state.oldPassword}
            onSubmitEditing={() => this.passwordInput.focus()}
            returnKeyType='next'/>

          <InputTextContainer
            label='វាយបញ្ចូលលេខសម្ងាត់ថ្មី'
            placeholder='វាយបញ្ចូលលេខសម្ងាត់ថ្មីនៅទីនេះ'
            secureTextEntry={true}
            onChangeText={(text) => this.setState({newPassword: text})}
            value={this.state.newPassword}
            ref={(input) => this.passwordInput = input}
            onSubmitEditing={() => this.passwordConfirmationInput.focus()}
            returnKeyType='next'/>

          <InputTextContainer
            label='វាយបញ្ចូលលេខសម្ងាត់ថ្មីម្តងទៀត'
            placeholder='វាយបញ្ចូលលេខសម្ងាត់ថ្មីម្តងទៀតនៅទីនេះ'
            secureTextEntry={true}
            onChangeText={(text) => this.setState({passwordConfirmation: text})}
            value={this.state.passwordConfirmation}
            ref={(input) => this.passwordConfirmationInput = input}
            returnKeyType='done'/>

          <View style={styles.submitWrapper}>
            <TouchableOpacity
              onPress={this.handleSubmit.bind(this)}
              disabled={!isEnabled}
              style={[styles.btnSubmit, {backgroundColor: btnSubmitColor}]}>
              <Text style={[styles.submitText, {color: btnSubmitTextColor}]}>យល់ព្រម</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Toast ref='toast' positionValue={ Platform.OS == 'ios' ? 120 : 140 }/>
      </View>
    )
  }
}
