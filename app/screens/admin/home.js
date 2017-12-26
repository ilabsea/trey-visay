import React from 'react';
import {
  DrawerNavigator,
  StackNavigator,
} from 'react-navigation';

// Screens
import Dashboard from './dashboard_screen';
import About from '../about';
import Profile from '../profile';
import SideMenu from './side_menu';

const AdminHomeScreen = DrawerNavigator(
  {
    Dashboard: { screen: Dashboard },
    About: { screen: About },

  },
  {
    initialRouteName: 'Dashboard',
    // initialRouteName: 'About',
    contentComponent: SideMenu,
    contentOptions: {
      activeTintColor: '#1976d2',
    },
  }
);

export default AdminHomeScreen;
