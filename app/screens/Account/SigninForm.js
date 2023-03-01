import React, { Component } from 'react';
import {
  View,
  Alert,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar
} from 'react-native';
// import firebase from 'react-native-firebase';

// Utils
import realm from '../../db/schema';
import User from '../../utils/user';
import styles from '../../assets/style_sheets/account';
import uuidv4 from '../../utils/uuidv4';

import scrollHeaderStyles from '../../assets/style_sheets/scroll_header';
import ScrollableHeader from '../../components/scrollable_header';
import BackButton from '../../components/shared/back_button';
import { Container, Content, Icon, Button, Input, Item, Form } from 'native-base';
import { Colors } from '../../assets/style_sheets/main/colors';
import keyword from '../../data/analytics/keyword';
import Text from '../../components/Text';

import * as RootNavigation from '../StackNav/RootNavigation.js';

import { reset } from '../StackNav/RootNavigation.js';

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

  _renderNavigation = () => {
    if (this.props.route.params && this.props.route.params.disableNavigationBar) {
      return (null)
    }

    let marginRight = Platform.OS === 'ios' ? 30 : 44;

    return (
      <View style={{flexDirection: 'row'}}>
        <BackButton buttonColor='#fff' navigation={this.props.navigation} />
        <Text style={[scrollHeaderStyles.whiteNavTitle, {textAlign: 'center', flex: 1, marginRight: marginRight}]}>សូមស្វាគមន៍</Text>
      </View>
    )
  }

  _renderForeground = () => {
    let imageUrl = this.state.isLogin ? require('../../assets/images/account/login.png') : require('../../assets/images/account/register.png');
    return (
      <View style={{height: 50, justifyContent: 'center', alignItems: 'flex-end', marginBottom: 10, flexDirection: 'row'}}>
        <Image
          style={{width: 50, height: 48}}
          source={imageUrl}/>
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
      <View style={[styles.note,{alignItems: 'center'}]}>
        <Text style={styles.agreementTerm}>
          By signing up you agree with Trey Visay
        </Text>

        <TouchableOpacity onPress={() => this.props.navigation.navigate('TermsCondition')} style={{flexDirection: 'row'}}>
          <Text style={[styles.agreementTerm, {fontWeight: 'bold'}]}>Terms of Service</Text>
          <Text style={[styles.agreementTerm]}> and</Text>
          <Text style={[styles.agreementTerm, {fontWeight: 'bold'}]}> Privacy Policy</Text>
        </TouchableOpacity>
      </View>
    )
  }

  _handleNavigation = (user) => {
    this.props.handleSignedIn(user);
  }

  _register = () => {
    // Todo:
    // firebase.analytics().logEvent(keyword.SIGNUP);

    if (!this.state.username || !this.state.password || !this.state.passwordConfirmation) {
      return Alert.alert(
        'ការបញ្ចូលមិនត្រឹមត្រូវ',
        "សូមពិនិត្យមើលព័ត៌មានម្តងទៀត!");
    }

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
        // firebase.analytics().setUserId(user.uuid);

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
    // firebase.analytics().logEvent(keyword.LOGIN);

    if (!this.state.username || !this.state.password) {
      return Alert.alert(
        'ការបញ្ចូលមិនត្រឹមត្រូវ',
        "សូមពិនិត្យមើលព័ត៌មានម្តងទៀត!");
    }

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

  _renderSubmitButton = () => {
    let action = this.state.isLogin ? this._login : this._register;
    let title = this.state.isLogin ? 'ចូលកម្មវិធី' : 'បង្កើតគណនី'

    return (
      <Button block style={{marginTop: 32}} onPress={action}>
        <Text style={{color: '#fff'}}>{title}</Text>
      </Button>
    )
  }

  _renderContent = () => {
    return (
      <View>
        { this._renderTabTitle() }

        <View style={{padding: 20}}>
          { this._renderForm() }
          { this._renderSubmitButton() }
          { this._renderAgreementTerm() }
        </View>
      </View>
    )
  }

  render() {
    return (
      <ScrollableHeader
        backgroundColor={Colors.blue}
        style={{backgroundColor: '#fff'}}
        renderContent={ this._renderContent }
        renderNavigation={ this._renderNavigation }
        renderForeground={ this._renderForeground }
        headerMaxHeight={140}
      />
    )
  }
}
