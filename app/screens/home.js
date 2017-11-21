import React from 'react';
import {
  DrawerNavigator,
  StackNavigator,
} from 'react-navigation';

// Screens
import Dashboard from './dashboard';
import About from './about';
import Profile from './profile'
import SideMenu from '../components/side_menu';
import PersonalUnderstandingForm from './PersonalUnderstandingForm/PersonalUnderstandingForm';
import CareerPlanningForm from './CareerPlanningForm/CareerPlanningForm';
import SubjectScreen from './CareerPlanningForm/subject';
import ValueScreen from './CareerPlanningForm/value_screen';
import ValueJobsScreen from './CareerPlanningForm/value_jobs_screen';
import PersonalityScreen from './CareerPlanningForm/personality_screen';
import PersonalityJobsScreen from './CareerPlanningForm/personality_jobs_screen';
import SummaryScreen from './CareerPlanningForm/summary_screen';
import CareerCounsellor from './CareerCounsellor/CareerCounsellor';
import EditProfilePhoto from './edit_profile_photo';
import EditPersonalInfo from './edit_personal_info';
import EditFamilyInfo from './edit_family_info';
import EditFamilySituation from './edit_family_situation';
import Institution from './institution';
import Video from './video';

const careerCounsellorStack = StackNavigator(
  {
    CareerCounsellorScreen: { screen: CareerCounsellor},
    PersonalUnderstandingFormScreen: { screen: PersonalUnderstandingForm},
    CareerPlanningFormScreen: { screen: CareerPlanningForm},
    SubjectScreen: { screen: SubjectScreen},
    ValueScreen: { screen: ValueScreen},
    ValueJobsScreen: { screen: ValueJobsScreen },
    PersonalityScreen: { screen: PersonalityScreen },
    PersonalityJobsScreen: { screen: PersonalityJobsScreen },
    SummaryScreen: { screen: SummaryScreen },
  }, {
    initialRouteName: 'SummaryScreen',
  }
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
      screen: careerCounsellorStack
    },
    Institution: { screen: Institution },
    Video: { screen: Video },
  },
  {
    // initialRouteName: 'Dashboard',
    initialRouteName: 'CareerCounsellorScreen',
    // initialRouteName: 'ProfileStack',
    contentComponent: SideMenu,
    order: [
      'Dashboard',
      'PersonalUnderstandingForm',
      'CareerCounsellorScreen',
      'Institution',
      'Video',
      'About',
      'ProfileStack',
    ],
    contentOptions: {
      activeTintColor: '#1976d2',
    },
  }
);

export default HomeScreen;
