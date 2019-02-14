import React from 'react';
import {
  createDrawerNavigator
} from 'react-navigation';

// Screens
import AboutStack from '../stackNav/about_stack';
import Dashboard from './dashboard_stack';

import Profile from './profile';
import SideMenu from './side_menu';
import ChangePasswordScreen from '../change_password_screen';

const AdminHomeScreen = createDrawerNavigator(
  {
    AdminDashboard: { screen: Dashboard },
    About: { screen: AboutStack },
    ChangePasswordScreen: { screen: ChangePasswordScreen },
    Profile: { screen: Profile },
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
