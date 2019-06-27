import React, {Component} from 'react';
import {
  Text,
  View,
  Alert,
  TouchableOpacity,
  Platform
} from 'react-native';

import Toast, { DURATION } from 'react-native-easy-toast';
import styles from '../../assets/style_sheets/login_form';

import realm from '../../db/schema';
import User from '../../utils/user';

import ScrollableHeader from '../../components/scrollable_header';
import BackButton from '../../components/shared/back_button';
import { Container, Content, Icon, Button, Form, Item, Input } from 'native-base';

export default class ChangePasswordScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      oldPassword: '',
      newPassword: '',
      passwordConfirmation: '',
      user: User.getCurrent()
    }
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

  _renderContent = () => {
    const isEnabled = this.state.oldPassword.length && this.state.newPassword.length &&
                      this.state.passwordConfirmation.length;
    const btnSubmitTextColor = isEnabled ? '#fff' : '#868686';
    const btnSubmitColor = isEnabled ? '#4caf50' : '#d9d9d9';

    return (
      <Content style={{padding: 20}}>
        <Form>
          <Item regular style={{marginBottom: 18}}>
            <Icon name='md-key' />
            <Input
              onChangeText={(text) => this.setState({oldPassword: text})}
              returnKeyType='next'
              autoCorrect={false}
              value={this.state.oldPassword}
              secureTextEntry={true}
              onSubmitEditing={() => this.passwordInput._root.focus()}
              placeholderTextColor='rgba(0,0,0,0.7)'
              placeholder='លេខសម្ងាត់ចាស់'/>

            <Icon name='eye' style={{color: 'gray'}} />
          </Item>

          <Item regular style={{marginBottom: 18}}>
            <Icon name='md-key' />
            <Input
              secureTextEntry={true}
              returnKeyType='next'
              onChangeText={(text) => this.setState({newPassword: text})}
              ref={(input) => this.passwordInput = input}
              value={this.state.password}
              onSubmitEditing={() => this.passwordConfirmationInput._root.focus()}
              placeholderTextColor='rgba(0,0,0,0.7)'
              placeholder='លេខសម្ងាត់ថ្មី'/>
            <Icon name='eye' style={{color: 'gray'}} />
          </Item>

          { !this.state.isLogin &&
            <Item regular style={{marginBottom: 18}}>
              <Icon name='md-key' />
              <Input
                secureTextEntry={true}
                returnKeyType='done'
                value={this.state.passwordConfirmation}
                onChangeText={(text) => this.setState({passwordConfirmation: text})}
                ref={(input) => this.passwordConfirmationInput = input}
                placeholderTextColor='rgba(0,0,0,0.7)'
                placeholder='បញ្ជាក់លេខសំងាត់ថ្មីម្តងទៀត'/>
              <Icon name='eye' style={{color: 'gray'}} />
            </Item>
          }
        </Form>

        <View style={styles.submitWrapper}>
          <TouchableOpacity
            onPress={this.handleSubmit.bind(this)}
            disabled={!isEnabled}
            style={[styles.btnSubmit, {backgroundColor: btnSubmitColor}]}>
            <Text style={[styles.submitText, {color: btnSubmitTextColor, fontWeight: 'bold'}]}>យល់ព្រម</Text>
          </TouchableOpacity>
        </View>
      </Content>
    )
  }

  render() {
    let title = 'ផ្លាស់ប្តូរលេខសំងាត់';

    return (
      <View style={styles.container}>
        <ScrollableHeader
          style={{backgroundColor: '#fff'}}
          renderContent={ this._renderContent }
          renderNavigation={ () => <BackButton navigation={this.props.navigation}/> }
          title={title}
          largeTitle={title}
        />

        <Toast ref='toast' positionValue={ Platform.OS == 'ios' ? 120 : 140 }/>
      </View>
    )
  }
}
