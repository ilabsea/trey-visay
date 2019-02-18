'use strict';

import React, { Component } from 'react';
import {
  View,
  AppRegistry,
  Text,
  Platform
} from 'react-native';

import { createStackNavigator } from 'react-navigation';
import User from './app/utils/user';

// Screens
import HomeScreen from './app/screens/home';
import AdminHomeNavigator from './app/screens/admin/home';

const HomeNavigator = createStackNavigator({
  Home: {
    screen: ({ navigation }) => <HomeScreen screenProps={{ rootNavigation: navigation }} />,
    navigationOptions: ({navigation}) => ({
      header: null
    }),
  },
}, {
  initialRouteName: 'Home',
});

const AdminNavigator = createStackNavigator({
  AdminHome: {
    screen: ({ navigation }) => <AdminHomeNavigator screenProps={{ rootNavigation: navigation }} />,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  }
}, {
  initialRouteName: 'AdminHome',
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  componentWillMount(){
    setTimeout(() => {
      let user = User.getCurrent();
      this.setState({user: user});
    }, 300)
  }

  setHomeRoute(){
    if(this.state.user){
      let app = this.state.user.role=='admin' ? AdminNavigator: HomeNavigator;
      return app;
    }
    return HomeNavigator;
  }

  render() {
    let AppNavigator = this.setHomeRoute();
    return (<AppNavigator/>);
  }
}
