import React from 'react';
import {
  createDrawerNavigator,
  createStackNavigator
} from 'react-navigation';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import headerStyles from '../assets/style_sheets/header';

// Screens
import ProfileStack from './StackNav/profile_stack';
import VocationalStack from './StackNav/Vocational/VocationalStack';
import DashboardStack from './StackNav/dashboard_stack';
import SchoolStack from './StackNav/School/SchoolStack';
import AboutStack from './StackNav/about_stack';
import ChangePasswordStack from './StackNav/change_password_stack';
import AccountStack from './StackNav/account_stack';
import CareerCounsellorStack from './StackNav/CareerCounsellor/CareerCounsellorStack';

import VideoScreen from './Video/VideoScreen';
import SideMenu from '../components/side_menu/side_menu';

const HomeScreen = createDrawerNavigator(
  {
    Dashboard: { screen: DashboardStack },
    AccountStack: { screen: AccountStack },
    About: { screen: AboutStack },
    ProfileStack: { screen: ProfileStack },
    SchoolStack: { screen: SchoolStack},
    VideoScreen: {
      screen: VideoScreen,
      header: { visible:false }
    },
    VocationalStack: { screen: VocationalStack },
    ChangePasswordStack: { screen: ChangePasswordStack },
    CareerCounsellorStack: { screen: CareerCounsellorStack }
  },
  {
    initialRouteName: 'Dashboard',
    contentComponent: SideMenu,
    contentOptions: {
      activeTintColor: '#1976d2',
    }
  }
);

export default HomeScreen;
