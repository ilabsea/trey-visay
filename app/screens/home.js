import React from 'react';
import {
  createDrawerNavigator,
  createStackNavigator
} from 'react-navigation';


import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import headerStyles from '../assets/style_sheets/header';

// Screens
import ProfileStack from './stackNav/profile_stack';
import VocationalJobStack from './stackNav/vocational_job_stack';
import DashboardStack from './stackNav/dashboard_stack';
import InstitutionStack from './school/institution_stack';
import AboutStack from './stackNav/about_stack';
import ChangePasswordStack from './stackNav/change_password_stack';
import CareerCounsellorStack from './stackNav/career_counsellor_stack';

import VideoScreen from './video_screen';
import SideMenu from '../components/side_menu';
import PersonalUnderstandingForm from './PersonalUnderstandingForm/PersonalUnderstandingForm';

const HomeScreen = createDrawerNavigator(
  {
    Dashboard: { screen: DashboardStack },
    About: { screen: AboutStack },
    ProfileStack: { screen: ProfileStack },
    CareerCounsellorStack: { screen: CareerCounsellorStack },
    InstitutionStack: {
      screen: ({ navigation }) => <InstitutionStack screenProps={{ drawerNavigation: navigation, category: 'សាលារដ្ឋ' }} /> },
    VideoScreen: {
      screen: VideoScreen,
      header: { visible:false }
    },
    VocationalJobStack: { screen: VocationalJobStack },
    ChangePasswordStack: { screen: ChangePasswordStack },
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
