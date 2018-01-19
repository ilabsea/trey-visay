import React from 'react';
import {
  DrawerNavigator,
  StackNavigator,
  TabNavigator,
} from 'react-navigation';

// Screens
import Dashboard from './dashboard';
import About from './about';
import Profile from './profile';
import SideMenu from '../components/side_menu';
import VocationalJobScreen from './vocational_job_screen';

import PersonalUnderstandingForm from './PersonalUnderstandingForm/PersonalUnderstandingForm';

import SubjectScreen from './CareerPlanningForm/subject_screen';
import PersonalityScreen from './CareerPlanningForm/personality_screen';
import PersonalityJobsScreen from './CareerPlanningForm/personality_jobs_screen';
import SummaryScreen from './CareerPlanningForm/summary_screen';
import RecommendationScreen from './CareerPlanningForm/recommendation_screen';
import GoalScreen from './CareerPlanningForm/goal_screen';
import ContactScreen from './CareerPlanningForm/contact_screen';
import CareerDetailScreen from './CareerPlanningForm/career_detail_screen';
import CareerCounsellor from './CareerCounsellor/CareerCounsellor';
import CareersScreen from './CareerPlanningForm/careers_screen';
import GameHistoryScreen from './CareerPlanningForm/game_history_screen';

import PersonalUnderstandingReport from './CareerPlanningForm/game_history/personal_understanding_report';
import SubjectReport from './CareerPlanningForm/game_history/subject_report';
import PersonalityReport from './CareerPlanningForm/game_history/personality_report';
import StudentPersonalityReport from './CareerPlanningForm/game_history/student_personality_report';
import RecommendationReport from './CareerPlanningForm/game_history/recommendation_report';

import EditProfilePhoto from './edit_profile_photo';
import EditPersonalInfo from './edit_personal_info';
import EditFamilyInfo from './edit_family_info';
import EditFamilySituation from './edit_family_situation';
import InstitutionDetail from './institution_detail';
import VideoScreen from './video_screen';
import ChangePasswordScreen from './change_password_screen';
import InstitutionStack from './institution_stack';

const careerCounsellorStack = StackNavigator(
  {
    CareerCounsellorScreen: { screen: CareerCounsellor },
    PersonalUnderstandingFormScreen: { screen: PersonalUnderstandingForm },
    CareerDetailScreen: { screen: CareerDetailScreen },
    SubjectScreen: { screen: SubjectScreen },
    PersonalityScreen: { screen: PersonalityScreen },
    PersonalityJobsScreen: { screen: PersonalityJobsScreen },
    SummaryScreen: { screen: SummaryScreen },
    RecommendationScreen: { screen: RecommendationScreen },
    GoalScreen: { screen: GoalScreen },
    ContactScreen: { screen: ContactScreen },
    CareersScreen: { screen: CareersScreen },
    InstitutionDetail: { screen: InstitutionDetail },
    GameHistoryScreen: { screen: GameHistoryScreen },

    PersonalUnderstandingReport: { screen: PersonalUnderstandingReport },
    SubjectReport: { screen: SubjectReport },
    PersonalityReport: { screen: PersonalityReport },
    StudentPersonalityReport: { screen: StudentPersonalityReport },
    RecommendationReport: { screen: RecommendationReport },
  }, {
    initialRouteName: 'CareerCounsellorScreen',
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
    InstitutionStack: { screen: ({ navigation }) => <InstitutionStack screenProps={{ drawerNavigation: navigation }} /> },
    VideoScreen: { screen: VideoScreen },
    VocationalJobScreen: { screen: VocationalJobScreen },
    ChangePasswordScreen: { screen: ChangePasswordScreen },
  },
  {
    initialRouteName: 'Dashboard',
    // initialRouteName: 'InstitutionStack',
    // initialRouteName: 'VideoScreen',
    // initialRouteName: 'CareerCounsellorScreen',
    // initialRouteName: 'ProfileStack',
    // initialRouteName: 'About',
    // initialRouteName: 'ChangePasswordScreen',
    contentComponent: SideMenu,
    contentOptions: {
      activeTintColor: '#1976d2',
    },
  }
);

export default HomeScreen;
