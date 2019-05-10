import React, { Component } from 'react';

import { createStackNavigator } from  'react-navigation';
import headerStyles from '../../assets/style_sheets/header';
import BackButton from '../../components/shared/back_button';

import ChangePasswordScreen from '../Account/change_password_screen';

const ChangePasswordStack = createStackNavigator(
  {
    AboutScreen: {
      screen: ChangePasswordScreen,
      navigationOptions: ({navigation}) => ({
        headerTitleStyle: [headerStyles.headerTitleStyle],
        headerStyle: headerStyles.headerStyle,
        title: 'ប្តូរលេខសម្ងាត់',
        headerLeft: <BackButton navigation={navigation}/>
      })
    }
  }
);


export default ChangePasswordStack;
