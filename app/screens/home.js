import React from 'react';
import {
  createDrawerNavigator,
  createStackNavigator
} from 'react-navigation';


import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import headerStyles from '../assets/style_sheets/header';
import OpenDrawer from '../components/open_drawer';

// Screens
import CareerCounsellorStack from './stackNav/career_counsellor_stack';
import ProfileStack from './stackNav/profile_stack';
import VocationalJobStack from './stackNav/vocational_job_stack';
import DashboardStack from './stackNav/dashboard_stack';
import InstitutionStack from './school/institution_stack';
import AboutStack from './stackNav/about_stack';

import VideoScreen from './video_screen';
import ChangePasswordScreen from './change_password_screen';
import SideMenu from '../components/side_menu';
import PersonalUnderstandingForm from './PersonalUnderstandingForm/PersonalUnderstandingForm';

const HomeScreen = createDrawerNavigator(
  {
    Dashboard: { screen: DashboardStack },
    About: { screen: AboutStack },
    ProfileStack: { screen: ProfileStack },
    PersonalUnderstandingForm: { screen: PersonalUnderstandingForm },
    CareerCounsellorScreen: {
      name: 'CareerCounsellorStack',
      screen: CareerCounsellorStack
    },
    InstitutionStack: { screen: ({ navigation }) => <InstitutionStack screenProps={{ drawerNavigation: navigation }} /> },
    VideoScreen: { screen: VideoScreen },
    VocationalJobStack: { screen: VocationalJobStack },
    ChangePasswordScreen: { screen: ChangePasswordScreen },
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
