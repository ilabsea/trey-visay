import React from 'react';
import {
  createDrawerNavigator
} from 'react-navigation';

// Screens
import Dashboard from './dashboard_screen';
import About from '../about';
import Profile from './profile';
import SideMenu from './side_menu';
import ChangePasswordScreen from '../change_password_screen';

const AdminHomeScreen = createDrawerNavigator(
  {
    Dashboard: { screen: Dashboard },
    About: { screen: About },
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
