'use strict';

import React, { Component } from 'react';
import {
  View,
  AppRegistry,
  Text,
  Platform
} from 'react-native';

import { createStackNavigator } from 'react-navigation';

// Screens
import ProfileForm from './app/screens/profile/profile_form';
import HomeNavigator from './app/screens/home';
import Login from './app/screens/login';
import AdminLogin from './app/screens/admin/login';
import Register from './app/screens/register';
import AdminHomeNavigator from './app/screens/admin/home';

import User from './app/utils/user';
import uuidv4 from './app/utils/uuidv4';
import realm from './app/schema';

const AppNavigator = createStackNavigator({
  Login: { screen: Login },
  AdminLogin: { screen: AdminLogin },
  Register: { screen: Register },
  ProfileForm: { screen: ProfileForm },
  Home: {
    screen: ({ navigation }) => <HomeNavigator screenProps={{ rootNavigation: navigation }} />,
    navigationOptions: ({navigation}) => ({
      header: null
    }),
  },
  AdminHome: {
    screen: ({ navigation }) => <AdminHomeNavigator screenProps={{ rootNavigation: navigation }} />,
    navigationOptions: ({navigation}) => ({
      header: null
    }),
  }
}, {
  initialRouteName: 'Login',
});

export default class App extends Component {
  render() {
    return (<AppNavigator/>);
  }
}
