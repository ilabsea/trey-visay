import React, {Component} from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';
import Login  from '../roots/login';
import ProfileForm  from './profile_form';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
  };
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View>
        <Text>Hello, Navigation!</Text>
        <Button
          onPress={() => navigate('ProfileForm')}
          title="Chat with Lucy"
        />
      </View>
    );
  }
}

export default HomeScreen;
