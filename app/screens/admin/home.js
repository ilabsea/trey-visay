import React from 'react';
import {
  createDrawerNavigator
} from 'react-navigation';

// Screens
import AboutStack from '../stackNav/about_stack';
import Dashboard from './dashboard_stack';

import SideMenu from './side_menu/side_menu';

const AdminHomeScreen = createDrawerNavigator(
  {
    AdminDashboard: { screen: Dashboard },
    About: { screen: AboutStack }
  },
  {
    initialRouteName: 'AdminDashboard',
    contentComponent: SideMenu,
    contentOptions: {
      activeTintColor: '#1976d2',
    },
  }
);

export default AdminHomeScreen;
