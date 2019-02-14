import React, { Component } from 'react';

import { createStackNavigator } from 'react-navigation';

import headerStyles from '../../assets/style_sheets/header';
import SaveButton from '../../components/shared/save_button';

import ProfileForm from '../profile/profile_form';
import Login from '../Account/login';
import IntroStack from './intro_stack';
import HomeScreen from '../home';
import Register from '../Account/register';
import CareerCounsellorStack from './career_counsellor_stack';

const AccountStack = createStackNavigator(
  {
<<<<<<< cbe107eb82a40ea17e26b175a76917ab16d49d3e
    Intro: {
      screen: IntroStack,
=======
    Intro: { screen: Intro },
    Login: { screen: Login },
    AdminLogin: { screen: AdminLogin },
    AdminHome: {
      screen: ({ navigation }) => <AdminHomeScreen screenProps={{ rootNavigation: navigation }} />,
>>>>>>> fix navigation register account
      navigationOptions: ({navigation}) => ({
        header: null
      }),
    },
<<<<<<< cbe107eb82a40ea17e26b175a76917ab16d49d3e
    Login: { screen: Login },
=======
>>>>>>> fix navigation register account
    Home: {
      screen: ({ navigation }) => <HomeScreen screenProps={{ rootNavigation: navigation }} />,
      navigationOptions: ({navigation}) => ({
        header: null
      }),
    },
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
