'use strict';

import React, { Component } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import realm from './app/db/schema';
// import Sidekiq from './app/utils/models/sidekiq';

import HomeStackNav from './app/screens/StackNav/Home/HomeStackNav';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.handlerPredefinedUser();
  }

  // componentDidMount(){
  //   setTimeout(() => {
  //     Sidekiq.uploadAll();
  //   }, 1000);
  // }

  handlerPredefinedUser() {
    let uuid = '0335745d-daa3-485b-bc0f-3610db5udemo';
    let predefinedUser = realm.objects('User').filtered('uuid="' + uuid + '"')[0];

    if (!!predefinedUser) { return; }

    realm.write(() => {
      realm.create('User', { uuid: uuid, fullName: 'Demo', username: 'Demo', password: '123456', dateOfBirth: Date()}, true);
    });
  }

  render() {
    return (
      <HomeStackNav/>
    );
  }
}
