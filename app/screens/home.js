import React from 'react';
import { DrawerNavigator } from 'react-navigation';

import Dashboard from './dashboard';
import About from './about';
import Profile from './profile'
import DrawerMenu from './drawer_menu';

const HomeScreen = DrawerNavigator(
  {
    Dashboard: { screen: Dashboard },
    About: { screen: About },
    Profile: { screen: Profile },
  },
  {
    // initialRouteName: 'Dashboard',
    initialRouteName: 'Profile',
    contentComponent: DrawerMenu,
    contentOptions: {
      activeTintColor: '#e91e63',
    },
  }
);

export default HomeScreen;
