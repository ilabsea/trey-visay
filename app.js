'use strict';

import React, { Component } from 'react';
import {
  View,
  AppRegistry,
  Text,
  Platform
} from 'react-native';

import realm from './app/schema';

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
    this.handlerPredefinedUser();
  }

  componentWillMount(){
    setTimeout(() => {
      let user = User.getCurrent();
      this.setState({user: user});
    }, 300)
  }

  handlerPredefinedUser() {
    let uuid = '0335745d-daa3-485b-bc0f-3610db5udemo';
    let predefinedUser = realm.objects('User').filtered('uuid="' + uuid + '"')[0];

    if (!!predefinedUser) { return; }

    realm.write(() => {
      realm.create('User', { uuid: uuid, fullName: 'Demo', username: 'Demo', password: '123456', dateOfBirth: Date()}, true);
    });
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
