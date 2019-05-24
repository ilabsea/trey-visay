import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Alert,
  Image,
  StyleSheet
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

export default class Login extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      passwordConfirmation: '',
      loaded: false,
      isLogin: true
    };
  }

  componentDidMount() {
    User.isLoggedin(this.handleUser.bind(this));
  }

  isUserInfoCompleted(user) {
    return !!user && !!user.dateOfBirth;
  }

  handleUser(userId) {
    if (!userId) {
      return this.setState({loaded: true});
    }

    let user = realm.objects('User').filtered('uuid="' + userId + '"')[0];

    if (!user) {
      User.logout();
      return this.setState({loaded: true});
    }

    if (this.isUserInfoCompleted(user)) {
      return this.props.navigation.dispatch({
        type: 'Navigation/RESET',
        index: 0,
        actions: [{
          type: 'Navigation/NAVIGATE',
          routeName:'Home'
        }]
      })
    }

    this.props.navigation.dispatch({
      type: 'Navigation/RESET',
      index: 0,
      actions: [{
        type: 'Navigation/NAVIGATE',
        routeName:'ProfileForm'
      }]
    })
  }

  _renderNavigation = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <BackButton navigation={this.props.navigation}/>
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
          <Icon active name='person' />
          <Input
            onChangeText={(text) => this.setState({username: text})}
            returnKeyType='next'
            autoCorrect={false}
            value={this.state.username}
            placeholderTextColor='rgba(0,0,0,0.7)'
            placeholder='ឈ្មោះគណនី'/>
        </Item>

        <Item regular style={styles.textInput}>
          <Icon name='key' />
          <Input
            secureTextEntry={true}
            onChangeText={(text) => this.setState({password: text})}
            ref={(input) => this.passwordInput = input}
            value={this.state.password}
            placeholderTextColor='rgba(0,0,0,0.7)'
            placeholder='លេខសម្ងាត់'/>
          <Icon name='eye' style={{color: 'gray'}} />
        </Item>

        { !this.state.isLogin &&
          <Item regular style={styles.textInput}>
            <Icon name='key' />
            <Input
              secureTextEntry={true}
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
        let user = realm.create('User', this.buildData());

        User.setLogin(user.uuid, ()=> {
          this.props.navigation.dispatch({
            type: 'Navigation/RESET',
            index: 0,
            actions: [{
              type: 'Navigation/NAVIGATE',
              routeName:'ProfileForm'
            }]
          })
        });

      });
    } catch (e) {
      alert(e);
    }
  }

  buildData() {
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

    User.setLogin(user.uuid, ()=>{
      if (!!user.dateOfBirth) {

        return this.props.navigation.dispatch({
          type: 'Navigation/RESET',
          index: 0,
          actions: [{
            type: 'Navigation/NAVIGATE',
            // routeName:'CareerCounsellorStack',
            routeName:'PersonalityAssessmentStack',
          }]
        })
      }

      this.props.navigation.dispatch({
        type: 'Navigation/RESET',
        index: 0,
        actions: [{
          type: 'Navigation/NAVIGATE',
          routeName:'ProfileForm'
        }]
      })
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
    if (!this.state.loaded) { return(null)}

    return (
      <ScrollableHeader
        renderContent={ this._renderContent }
        renderNavigation={ this._renderNavigation }
        renderForeground={ this._renderForeground }
        headerMaxHeight={160}
      />
    )
  }
}
