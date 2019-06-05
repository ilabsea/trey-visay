import React, { Component } from 'react';
import {
  View,
  Alert,
  Image,
} from 'react-native';

// Utils
import realm from '../../db/schema';
import User from '../../utils/user';
import styles from '../../assets/style_sheets/account';
import uuidv4 from '../../utils/uuidv4';

import scrollHeaderStyles from '../../assets/style_sheets/scroll_header';
import ScrollableHeader from '../../components/scrollable_header';
import BackButton from '../../components/shared/back_button';
import { Container, Content, Icon, Button, Input, Item, Form, Text } from 'native-base';
import { NavigationActions } from 'react-navigation';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      passwordConfirmation: '',
      isLogin: true
    };
  }

  _isUserInfoCompleted(user) {
    return !!user && !!user.dateOfBirth;
  }

  _renderNavigation = () => {
    if (this.props.navigation.getParam('disableNavigationBar')) {
      return (null)
    }

    return (
      <View style={{flexDirection: 'row'}}>

        <Button transparent onPress={() => this.props.navigation.goBack(null)}>
          <Icon name='arrow-back' style={{color: '#fff'}} />
        </Button>

        <Text style={scrollHeaderStyles.title}>សូមស្វាគមន៍</Text>
      </View>
    )
  }

  _renderForeground = () => {
    return (
      <View style={{backgroundColor: 'transparent', height: 50, justifyContent: 'center', alignItems: 'flex-end', marginBottom: 16, flexDirection: 'row'}}>
        { !this.state.isLogin &&
          <Image
            style={{width: 50, height: 48}}
            source={require('../../assets/images/account/register.png')}/>
        }

        { this.state.isLogin && <Icon name="ios-log-in" style={{color: '#fff', fontSize: 44}}/> }
      </View>
    )
  }

  _renderTabTitle() {
    let loginActive = this.state.isLogin ? styles.activeText : {};
    let registerActive = !this.state.isLogin ? styles.activeText : {};

    return (
      <View style={styles.tabTitleWrapper}>
        <View style={{flex: 1}}>
          <Button transparent block onPress={() => this.setState({isLogin: true})}>
            <Text style={[styles.tabtitleText, loginActive]}>បញ្ជូលគណនី</Text>
          </Button>
        </View>

        <View style={[{flex: 1}, styles.leftBar]}>
          <Button transparent block onPress={() => this.setState({isLogin: false})}>
            <Text style={[styles.tabtitleText, registerActive]}>បង្កើតគណនី</Text>
          </Button>
        </View>
      </View>
    )
  }

  _renderForm() {
    return (
      <Form>
        <Item regular style={styles.textInput}>
          <Icon active name='md-person' />
          <Input
            onChangeText={(text) => this.setState({username: text})}
            returnKeyType='next'
            autoCorrect={false}
            value={this.state.username}
            onSubmitEditing={() => this.passwordInput._root.focus()}
            placeholderTextColor='rgba(0,0,0,0.7)'
            placeholder='ឈ្មោះគណនី'/>
        </Item>

        <Item regular style={styles.textInput}>
          <Icon name='md-key' />
          <Input
            secureTextEntry={true}
            returnKeyType='next'
            onChangeText={(text) => this.setState({password: text})}
            ref={(input) => this.passwordInput = input}
            value={this.state.password}
            onSubmitEditing={() => !! this.passwordConfirmationInput && this.passwordConfirmationInput._root.focus()}
            placeholderTextColor='rgba(0,0,0,0.7)'
            placeholder='លេខសម្ងាត់'/>
          <Icon name='eye' style={{color: 'gray'}} />
        </Item>

        { !this.state.isLogin &&
          <Item regular style={styles.textInput}>
            <Icon name='md-key' />
            <Input
              secureTextEntry={true}
              returnKeyType='next'
              value={this.state.passwordConfirmation}
              onChangeText={(text) => this.setState({passwordConfirmation: text})}
              ref={(input) => this.passwordConfirmationInput = input}
              placeholderTextColor='rgba(0,0,0,0.7)'
              placeholder='លេខសម្ងាត់ម្តងទៀត'/>
            <Icon name='eye' style={{color: 'gray'}} />
          </Item>
        }
      </Form>
    )
  }

  _renderAgreementTerm() {
    if (this.state.isLogin) {
      return (null)
    }

    return (
      <Text style={styles.agreementTerm}>
        By signing up you agree with Trey Visay Terms of Service and Privacy Policy
      </Text>
    )
  }

  _handleNavigation = (user) => {
    if (!this._isUserInfoCompleted(user)) {
      return this.props.navigation.reset([NavigationActions.navigate({ routeName: 'ProfileForm', params: {from: this.props.navigation.getParam('from')} })]);
    }

    this.props.navigation.reset([NavigationActions.navigate({ routeName: this.props.navigation.getParam('from') })]);
  }

  _register = () => {
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
        let user = realm.create('User', this._buildData());

        User.setLogin(user.uuid, ()=> {
          return this._handleNavigation(user);
        });
      });
    } catch (e) {
      alert(e);
    }
  }

  _buildData() {
    return {
      uuid: uuidv4(),
      fullName: this.state.username,
      username: this.state.username,
      password: this.state.password
    };
  }

  _login = () => {
    let user = realm.objects('User').filtered('username="' + this.state.username + '" AND password="' + this.state.password + '"')[0];
    if (!user) {
      return Alert.alert(
        'ការបញ្ចូលមិនត្រឹមត្រូវ',
        'ឈ្មោះគណនី ឬលេខសម្ងាត់ដែលអ្នកបានបញ្ចូលមិនត្រឹមត្រូវ។ សូមព្យាយាមម្តងទៀត។');
    }

    User.setLogin(user.uuid, () => {
      this._handleNavigation(user);
    });
  }

  _renderSubmitButton() {
    let action = this.state.isLogin ? this._login : this._register;
    let title = this.state.isLogin ? 'ចូលកម្មវិធី' : 'បង្កើតគណនី'

    return (
      <Button block style={{marginTop: 32}} onPress={action}>
        <Text>{title}</Text>
      </Button>
    )
  }

  _renderContent = () => {
    return (
      <View>
        { this._renderTabTitle() }

        <Container>
          <Content padder>
            { this._renderForm() }
            { this._renderSubmitButton() }
            { this._renderAgreementTerm() }
          </Content>
        </Container>
      </View>
    )
  }

  render() {
    return (
      <ScrollableHeader
        renderContent={ this._renderContent }
        renderNavigation={ this._renderNavigation }
        renderForeground={ this._renderForeground }
      />
    )
  }
}
