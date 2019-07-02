import React, { Component } from 'react';
import { Platform, StatusBar } from 'react-native';
import { createStackNavigator } from  'react-navigation';

import Home from '../../home/home';
import { FontSetting } from '../../../assets/style_sheets/font_setting';

const HomeStack = createStackNavigator(
  {
    HomeStack: {
      screen: Home,
      navigationOptions: ({navigation}) => ({
        header: null
      })
    }
  },
  {
    navigationOptions: ({
      headerStyle: {

      },
    }),
  }
);


export default HomeStack;
