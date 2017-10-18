import React, { Component } from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import Login  from '../roots/login';
import Register  from '../roots/register';
import ProfileForm from './profile_form';

export default  AccountNav = StackNavigator({
  Login: { screen: Login },
  Register: { screen: Register },
  ProfileForm: { screen: ProfileForm },
}, {
  initialRouteName: 'Login',
  headerMode: 'none'
});

