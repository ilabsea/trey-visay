import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  AsyncStorage,
} from 'react-native';
import Login  from '../roots/login';
import ProfileForm  from './profile_form';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
  };

  constructor(props) {
    super(props)
  }

  logout() {
    AsyncStorage.removeItem('token', () => {
      alert('logout');
      // this.props.navigation.navigate('Login');
    })
  }

  render() {
    // const { navigate } = this.props.navigation;

    return (
      <View>
        <Text>Hello, Navigation!</Text>
        <Button
          onPress={this.logout.bind(this)}
          title="Chat with Lucy"
        />
      </View>
    );
  }
}

export default HomeScreen;
