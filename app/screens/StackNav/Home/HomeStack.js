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
        title: 'ទំព័រដេីម',
        headerTitleStyle: {
          fontSize: FontSetting.nav_title
        }
      })
    }
  },
  {
    navigationOptions: ({
      headerStyle: {
        marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0
      },
    }),
  }
);


export default HomeStack;
