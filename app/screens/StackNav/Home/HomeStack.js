import React from 'react';
import { createStackNavigator } from 'react-navigation';

// Screens
import Home from '../../home/home';
import VocationalStack from '../Vocational/VocationalStack';
import SchoolStack from '../School/SchoolStack';
import AccountStack from '../account_stack';
import CareerCounsellorStack from '../CareerCounsellor/CareerCounsellorStack';

import VideoScreen from '../../Video/VideoScreen';

const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({navigation}) => ({
      title: 'ទំព័រដេីម'
    }),
  },
  AccountStack: { screen: AccountStack },
  SchoolStack: { screen: SchoolStack},
  VideoScreen: {
    screen: VideoScreen,
    header: { visible:false }
  },
  CareerCounsellorStack: { screen: CareerCounsellorStack },
  VocationalStack: { screen: VocationalStack }
}, {
  initialRouteName: 'Home',
});

export default HomeStack;
