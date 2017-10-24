import React from 'react';
import {
  DrawerNavigator,
  StackNavigator,
} from 'react-navigation';

// Screens
import Dashboard from './dashboard';
import About from './about';
import Profile from './profile'
import DrawerMenu from './drawer_menu';
import PersonalUnderstandingForm from './PersonalUnderstandingForm/PersonalUnderstandingForm';
import CareerCounsellor from './CareerCounsellor/CareerCounsellor';
import EditProfilePhoto from './edit_profile_photo';
import EditPersonalInfo from './edit_personal_info';
import EditFamilyInfo from './edit_family_info';
import EditFamilySituation from './edit_family_situation';

const careerCounsellorStack = StackNavigator(
  {
    CareerCounsellorScreen: { screen: CareerCounsellor},
    PersonalUnderstandingFormScreen: { screen: PersonalUnderstandingForm}
  },
);

const profileStack = StackNavigator(
  {
    Profile: {screen: Profile},
    EditProfilePhoto: {screen: EditProfilePhoto},
    EditPersonalInfo: {screen: EditPersonalInfo},
    EditFamilyInfo: {screen: EditFamilyInfo},
    EditFamilySituation: {screen: EditFamilySituation},
  });

const HomeScreen = DrawerNavigator(
  {
    Dashboard: { screen: Dashboard },
    About: { screen: About },
    ProfileStack: { screen: profileStack },
    PersonalUnderstandingForm: { screen: PersonalUnderstandingForm },
    CareerCounsellorScreen: {
      name: 'CareerCounsellorStack',
      screen: careerCounsellorStack,
    },
  },
  {
    initialRouteName: 'Dashboard',
    // initialRouteName: 'CareerCounsellorScreen',
    // initialRouteName: 'ProfileStack',
    contentComponent: DrawerMenu,
    contentOptions: {
      activeTintColor: '#e91e63',
    },
  }
);

export default HomeScreen;
