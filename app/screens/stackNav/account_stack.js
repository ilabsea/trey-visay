import React, { Component } from 'react';

import { createStackNavigator } from 'react-navigation';

import headerStyles from '../../assets/style_sheets/header';
import SaveButton from '../../components/save_button';

import ProfileForm from '../profile/profile_form';
import Login from '../Account/login';
import Intro from '../Account/intro';
import AdminLogin from '../admin/login';
import AdminHomeScreen from '../admin/home';
import HomeScreen from '../home';
import Register from '../Account/register';
import CareerCounsellorStack from './career_counsellor_stack';

const AccountStack = createStackNavigator(
  {
    Intro: { screen: Intro },
    Login: { screen: Login },
    Home: {
      screen: ({ navigation }) => <HomeScreen screenProps={{ rootNavigation: navigation }} />,
      navigationOptions: ({navigation}) => ({
        header: null
      }),
    },
    AdminLogin: { screen: AdminLogin },
    AdminHome: {
      screen: ({ navigation }) => <AdminHomeScreen screenProps={{ rootNavigation: navigation }} />,
      navigationOptions: ({navigation}) => ({
        header: null
      }),
    },
<<<<<<< 00e0a9a2f172b363fa2432f68c337d1e971f98b1
    Home: {
      screen: ({ navigation }) => <HomeScreen screenProps={{ rootNavigation: navigation }} />,
      navigationOptions: ({navigation}) => ({
        header: null
      }),
    },
=======
>>>>>>> fix admin login route + remove bio for admin
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
    CareerCounsellorStack: {
      screen: CareerCounsellorStack,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    }
  },
  {
    initialRouteName: 'Intro',
  }
);

export default AccountStack;
