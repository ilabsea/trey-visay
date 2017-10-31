'use strict';

import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

// Screens
import ProfileForm from './app/screens/profile_form';
import HomeNavigator from './app/screens/home';
import Login from './app/screens/login';
import Register from './app/screens/register';

const AppNavigator = StackNavigator({
  Login: { screen: Login },
  Register: { screen: Register },
  ProfileForm: { screen: ProfileForm },
  Home: {
    screen: ({ navigation }) => <HomeNavigator screenProps={{ rootNavigation: navigation }} />,
    navigationOptions: ({navigation}) => ({
      header: null
    }),
  },
}, {
  initialRouteName: 'Login',
});

export default class App extends Component {
  render() {
    return ( <AppNavigator/> );
  }
}
