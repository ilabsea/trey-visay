import React, { Component } from 'react';
import {
  // Text,
  View,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import SplashScreen from 'react-native-splash-screen';
import DeviceInfo from 'react-native-device-info';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

// Utils
import realm from '../../db/schema';
import User from '../../utils/user';
// import styles from '../../assets/style_sheets/login_form';

// Components
import StatusBar from '../../components/shared/status_bar';
// import Button from '../../components/shared/button';

import scrollHeaderStyles from '../../assets/style_sheets/scroll_header';
import ScrollableHeader from '../../components/scrollable_header';
import BackButton from '../../components/shared/back_button';
import { Container, Header, Content, ListItem, Thumbnail, Left, Body, Right, Icon, Card, CardItem, Title, Button, Input, Item, Form, Text } from 'native-base';

export default class Login extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = { username: '', password: '', loaded: false };
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
      <View style={{alignItems: 'center', marginBottom: 20}}>
        <Image
          style={{width: 50, height: 47.6}}
          source={require('../../assets/images/account/register.png')}/>
      </View>
    )
  }

  _renderContent = () => {
    return (
      <View>
        <View style={styles.tabTitleWrapper}>
          <Text style={{flex: 1, textAlign: 'center'}}>បញ្ជូលគណនី</Text>
          <Text style={{flex: 1, textAlign: 'center', borderLeftWidth: 1, borderLeftColor: 'rgb(151, 151, 151)'}}>បង្កើតគណនី</Text>
        </View>

        <Container>
          <Content padder>
            <Form>
              <Item>
                <Icon active name='person' />
                <Input placeholder='ឈ្មោះគណនី'/>
              </Item>

              <Item>
                <Icon active name='key' />
                <Input placeholder='ឈ្មោះគណនី'/>
                <Icon name='eye' style={{color: 'gray'}} />
              </Item>
            </Form>

            <Button block>
              <Text>ចូលកម្មវិធី</Text>
            </Button>

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
        headerMaxHeight={160}
      />
    )
  }
}

const styles = StyleSheet.create({
  tabTitleWrapper: {
    flexDirection: 'row',
    // backgroundColor: 'rgb(155, 155, 155)',
    height: 54,
    alignItems: 'center'
  }
})
