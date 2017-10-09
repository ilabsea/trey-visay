import React from 'react';
import { DrawerNavigator } from 'react-navigation';

import Dashboard from './dashboard';
import About from './about';


const HomeScreen = DrawerNavigator(
  {
    Dashboard: { screen: Dashboard },
    About: { screen: About },
  },
  {
    initialRouteName: 'Dashboard',
    contentOptions: {
      activeTintColor: '#e91e63',
    },
  }
);

export default HomeScreen;
