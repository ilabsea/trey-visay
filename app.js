'use strict';

import React, { Component } from 'react';
import {
  View,
  AppRegistry,
  Text,
  Platform
} from 'react-native';

import realm from './app/schema';
import BackgroundFetch from "react-native-background-fetch";

import { createStackNavigator } from 'react-navigation';
import User from './app/utils/user';
import Task from './app/utils/task';

// Screens
import HomeScreen from './app/screens/home';

let MyHeadlessTask = async (event) => {
  Task.syncToServer();
  BackgroundFetch.finish();
}

BackgroundFetch.registerHeadlessTask(MyHeadlessTask);

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

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
    this.handlerPredefinedUser();
  }

  componentDidMount(){
    Task.configBackgroundFetch();
  }

  handlerPredefinedUser() {
    let uuid = '0335745d-daa3-485b-bc0f-3610db5udemo';
    let predefinedUser = realm.objects('User').filtered('uuid="' + uuid + '"')[0];

    if (!!predefinedUser) { return; }

    realm.write(() => {
      realm.create('User', { uuid: uuid, fullName: 'Demo', username: 'Demo', password: '123456', dateOfBirth: Date()}, true);
    });
  }

  render() {
    return (<HomeNavigator/>);
  }
}
