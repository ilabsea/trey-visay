import React, { Component } from 'react';

import { createStackNavigator } from  'react-navigation';

import Home from '../../home/home';

const HomeStack = createStackNavigator(
  {
    HomeStack: {
      screen: Home,
      navigationOptions: ({navigation}) => ({
        title: 'ទំព័រដេីម'
      })
    }
  }
);


export default HomeStack;
