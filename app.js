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
import HomeScreen from './app/screens/home';
import AdminHomeScreen from './app/screens/admin/home';

const AppNavigator = createStackNavigator({
  Home: {
    screen: ({ navigation }) => <HomeScreen screenProps={{ rootNavigation: navigation }} />,
    navigationOptions: ({navigation}) => ({
      header: null
    }),
  },
  AdminHome: {
    screen: ({ navigation }) => <AdminHomeScreen screenProps={{ rootNavigation: navigation }} />,
    navigationOptions: ({navigation}) => ({
      header: null
    }),
  }
}, {
  initialRouteName: 'Home',
});

export default class App extends Component {
  render() {
    return (<AppNavigator/>);
  }
}
