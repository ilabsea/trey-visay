import React from 'react';
import { DrawerNavigator } from 'react-navigation';

import Dashboard from './dashboard';
import About from './about';
import Profile from './profile'
import DrawerMenu from './drawer_menu';
import PersonalUnderstandingForm from './PersonalUnderstandingForm/PersonalUnderstandingForm';
import CareerCounsellor from './CareerCounsellor/CareerCounsellor';
import {
  StackNavigator,
} from 'react-navigation';

const careerCounsellorStack = StackNavigator(
  {
    CareerCounsellorScreen: { screen: CareerCounsellor},
    PersonalUnderstandingFormScreen: { screen: PersonalUnderstandingForm}
  },

);


const HomeScreen = DrawerNavigator(
  {
    Dashboard: { screen: Dashboard },
    About: { screen: About },
    Profile: { screen: Profile },
    PersonalUnderstandingForm: { screen: PersonalUnderstandingForm },
    CareerCounsellorScreen: {
      name: 'CareerCounsellorStack',
      screen: careerCounsellorStack
    },
  },
  {
    // initialRouteName: 'Dashboard',
    initialRouteName: 'CareerCounsellorScreen',
    contentComponent: DrawerMenu,
    contentOptions: {
      activeTintColor: '#e91e63',
    },
  }
);

export default HomeScreen;
