import React from 'react';
import {
  createDrawerNavigator
} from 'react-navigation';

// Screens
import AboutStack from '../stackNav/about_stack';
import DashboardStack from '../stackNav/dashboard_stack';

import Profile from './profile';
import SideMenu from './side_menu';
import ChangePasswordScreen from '../change_password_screen';

const AdminHomeScreen = createDrawerNavigator(
  {
    Dashboard: { screen: DashboardStack },
    About: { screen: AboutStack },
    ChangePasswordScreen: { screen: ChangePasswordScreen },
    Profile: { screen: Profile },
  },
  {
    initialRouteName: 'Dashboard',
    contentComponent: SideMenu,
    contentOptions: {
      activeTintColor: '#1976d2',
    },
  }
);

export default AdminHomeScreen;
