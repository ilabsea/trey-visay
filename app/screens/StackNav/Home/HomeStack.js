import React, { Component } from 'react';
import { Platform } from 'react-native';
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
  },
  {
    navigationOptions: ({
      headerStyle: {
        marginTop: Platform.OS == 'android' ? 24: 0
      },
    }),
  }
);


export default HomeStack;
