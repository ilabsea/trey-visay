import React, { Component } from 'react';

import { createStackNavigator } from 'react-navigation';

import ProfileForm from '../profile/profile_form';
import Login from '../Account/login';
import HomeScreen from '../home/home';
import CareerCounsellorStack from './CareerCounsellor/CareerCounsellorStack';
import PersonalityAssessmentStack from './Assessment/PersonalityAssessmentStack';

const AccountStack = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: ({navigation}) => ({
        header: null
      })
    },
    Home: {
      screen: ({ navigation }) => <HomeScreen screenProps={{ rootNavigation: navigation }} />,
      navigationOptions: ({navigation}) => ({
        header: null
      })
    },
    ProfileForm: {
      screen: ProfileForm,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    CareerCounsellorStack: {
      screen: CareerCounsellorStack,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    PersonalityAssessmentStack: {
      screen: PersonalityAssessmentStack,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    }
  },
  {
    initialRouteName: 'Login',
  }
);

export default AccountStack;
