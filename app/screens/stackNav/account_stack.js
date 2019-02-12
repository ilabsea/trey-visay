import React, { Component } from 'react';

import { createStackNavigator } from 'react-navigation';

import headerStyles from '../../assets/style_sheets/header';
import SaveButton from '../../components/save_button';

import ProfileForm from '../profile/profile_form';
import Login from '../login';
import AdminLogin from '../admin/login';
import Register from '../register';
import PersonalUnderstandingForm from '../PersonalUnderstandingForm/PersonalUnderstandingForm';

const AccountStack = createStackNavigator(
  {
    Login: { screen: Login },
    AdminLogin: { screen: AdminLogin },
    Register: { screen: Register },
    ProfileForm: {
      screen: ProfileForm,
      navigationOptions: ({ navigation }) => ({
        title: 'បំពេញប្រវត្តិរូបសង្ខេប',
        headerStyle: headerStyles.headerStyle,
        headerTitleStyle: headerStyles.headerTitleStyle,
        headerRight: (<SaveButton navigation={navigation}/>),
      })
    },
    PersonalUnderstandingFormScreen: {
      screen: PersonalUnderstandingForm
    },
  },
  {
    initialRouteName: 'Login',
  }
);

export default AccountStack;
