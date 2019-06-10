import React, { Component } from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from  'react-navigation';
import { Provider } from 'react-redux';
import store from '../../../redux/store';

import headerStyles from '../../../assets/style_sheets/header';
import CloseButton from '../../../components/shared/close_button';
import NextButton from '../../../components/NextButton';
import SaveButton from '../../../components/shared/save_button';
import BackButton from '../../../components/shared/back_button';
import OpenDrawer from '../../../components/shared/open_drawer';

import CareerCategoriesScreen from '../../Careers/CategoriesScreen';
import ShowCareerCategoryScreen from '../../Careers/ShowCategoryScreen';
import CareerDetailScreen from '../../Careers/DetailScreen';

import CareerCounsellor from '../../CareerCounsellor/CareerCounsellor';
import AboutCareerCounsellor from '../../CareerCounsellor/AboutCareerCounsellor';

import PersonalUnderstandingForm from '../../CareerTest/PersonalUnderstanding/PersonalUnderstandingForm';
import SubjectScreen from '../../CareerTest/Subject/subject_screen';
import PersonalityScreen from '../../CareerTest/Personality/personality_screen';
import PersonalityJobsScreen from '../../CareerTest/PersonalityJobs/personality_jobs_screen';
import SummaryScreen from '../../CareerTest/FavoriteJob/summary_screen';
import RecommendationScreen from '../../CareerTest/Recommendation/recommendation_screen';
import GoalScreen from '../../CareerTest/Goal/goal_screen';
import ContactScreen from '../../CareerTest/Contact/contact_screen';

import InstitutionDetail from '../../school/institution_detail';

import GameHistoryScreen from '../../GameHistory/game_history_screen';
import PersonalUnderstandingReport from '../../GameHistory/personal_understanding_report';
import SubjectReport from '../../GameHistory/subject_report';
import PersonalityReport from '../../GameHistory/personality_report';
import StudentPersonalityReport from '../../GameHistory/student_personality_report';
import RecommendationReport from '../../GameHistory/recommendation_report';
import SchoolListScreen from '../../GameHistory/school_list';

const CareerCounsellorStack = createStackNavigator(
  {
    CareerCounsellorScreen: {
      screen: CareerCounsellor,
      navigationOptions: ({navigation}) => ({
        title: 'វាយតម្លៃមុខរបរនិងអាជីព',
        header: null
      })
    },
    AboutCareerCounsellorScreen: {
      screen: AboutCareerCounsellor,
      navigationOptions: ({navigation}) => ({
        title: 'ការធ្វើតេសវាយតម្លៃមុខរបរ​ និងអាជីព',
        header: null
      })
    },

    PersonalUnderstandingFormScreen: {
      screen: PersonalUnderstandingForm,
      navigationOptions: ({navigation}) => ({
        header: null
      })
    },
    ShowCareerCategoryScreen: { screen: ShowCareerCategoryScreen },
    CareerDetailScreen: {
      screen: CareerDetailScreen
    },
    SubjectScreen: {
      screen: SubjectScreen,
      navigationOptions: ({navigation}) => ({
        header: null
      })
    },
    PersonalityScreen: {
      screen: PersonalityScreen,
      navigationOptions: ({navigation}) => ({
        header: null
      })
    },
    PersonalityJobsScreen: {
      screen: PersonalityJobsScreen,
      navigationOptions: ({navigation}) => ({
        header: null
      })
    },
    SummaryScreen: {
      screen: SummaryScreen,
      navigationOptions: ({navigation}) => ({
        header: null
      })
    },
    RecommendationScreen: {
      screen: RecommendationScreen,
      navigationOptions: ({navigation}) => ({
        header: null
      })
    },
    GoalScreen: {
      screen: GoalScreen,
      navigationOptions: ({navigation}) => ({
        header: null
      })
    },
    ContactScreen: {
      screen: ContactScreen,
      navigationOptions: ({navigation}) => ({
        header: null
      })
    },
    CareerCategoriesScreen: {
      screen: CareerCategoriesScreen,
      navigationOptions: ({navigation}) => ({
        header: null
      })
    },
    InstitutionDetail: {
      screen: InstitutionDetail,
      navigationOptions: ({navigation}) => ({
        header: null
      })
    },
    GameHistoryScreen: {
      screen: GameHistoryScreen,
      navigationOptions: ({
        title: 'លទ្ធផលតេស្ត'
      })
    },
    PersonalUnderstandingReport: {
      screen: PersonalUnderstandingReport,
      navigationOptions: ({
        title: 'ស្វែងយល់អំពីខ្លួនឯង'
      })
    },
    SubjectReport: {
      screen: SubjectReport,
      navigationOptions: ({
        title: 'ការបំពេញមុខវិជ្ជា'
      })
    },
    PersonalityReport: {
      screen: PersonalityReport,
      navigationOptions: ({
        title: 'ការជ្រើសរើសមុខរបរផ្អែកលើបុគ្គលិកលក្ខណៈ'
      })
    },
    StudentPersonalityReport: {
      screen: StudentPersonalityReport,
      navigationOptions: ({
        title: 'ការបំពេញបុគ្គលិកលក្ខណៈ'
      })
    },
    RecommendationReport: {
      screen: RecommendationReport,
      navigationOptions: ({
        title: 'ការផ្តល់អនុសាសន៍'
      })
    },
    SchoolListScreen: {
      screen: SchoolListScreen,
      navigationOptions: ({
        title: 'គ្រឹះស្ថានសិក្សា'
      })
    }
  },
  {
    navigationOptions: ({
      headerStyle: {
        marginTop: Platform.OS == 'android' ? 24: 0
      },
      headerBackTitle: null
    }),
    initialRouteName: 'CareerCounsellorScreen'
  }
);

export default CareerCounsellorStack;
