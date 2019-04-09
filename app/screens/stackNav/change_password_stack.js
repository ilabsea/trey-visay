import React, { Component } from 'react';

import { createStackNavigator } from  'react-navigation';
import headerStyles from '../../assets/style_sheets/header';
import CloseButton from '../../components/shared/close_button';

import ChangePasswordScreen from '../change_password_screen';

const ChangePasswordStack = createStackNavigator(
  {
    AboutScreen: {
      screen: ChangePasswordScreen,
      navigationOptions: ({navigation}) => ({
        headerTitleStyle: [headerStyles.headerTitleStyle],
        headerStyle: headerStyles.headerStyle,
        title: 'ប្តូរលេខសម្ងាត់',
        headerLeft: <CloseButton navigation={navigation}/>
      })
    }
  }
);


export default ChangePasswordStack;
