import React, { Component } from 'react';

import { createStackNavigator } from  'react-navigation';
import { Provider } from 'react-redux';
import store from '../../redux/store';

import headerStyles from '../../assets/style_sheets/header';
import CloseButton from '../../components/shared/close_button';
import SaveButton from '../../components/save_button';
import BackButton from '../../components/shared/back_button';

import PersonalUnderstandingForm from '../PersonalUnderstanding/PersonalUnderstandingForm';
import CareerCounsellor from '../CareerCounsellor/CareerCounsellor';
import CareerDetailScreen from '../CareerPlanning/career_detail_screen';
import SubjectScreen from '../CareerPlanning/subject_screen';
import PersonalityScreen from '../CareerPlanning/personality_screen';
import PersonalityJobsScreen from '../CareerPlanning/personality_jobs_screen';
import SummaryScreen from '../CareerPlanning/summary_screen';
import RecommendationScreen from '../CareerPlanning/recommendation_screen';
import GoalScreen from '../CareerPlanning/goal_screen';
import ContactScreen from '../CareerPlanning/contact_screen';
import CareersScreen from '../CareerPlanning/careers_screen';
import InstitutionDetail from '../school/institution_detail';
import GameHistoryScreen from '../CareerPlanning/game_history_screen';
import PersonalUnderstandingReport from '../CareerPlanning/game_history/personal_understanding_report';
import SubjectReport from '../CareerPlanning/game_history/subject_report';
import PersonalityReport from '../CareerPlanning/game_history/personality_report';
import StudentPersonalityReport from '../CareerPlanning/game_history/student_personality_report';
import RecommendationReport from '../CareerPlanning/game_history/recommendation_report';

const CareerCounsellorStack = createStackNavigator(
  {
    CareerCounsellorScreen: {
      screen: CareerCounsellor,
      navigationOptions: ({navigation}) => ({
        title: 'វាយតម្លៃមុខរបរនិងអាជីព',
        headerLeft: <BackButton navigation={navigation}/>
      })
    },
    PersonalUnderstandingFormScreen: {
      screen: PersonalUnderstandingForm,
      navigationOptions: ({navigation}) => ({
        title: 'ស្វែងយល់អំពីខ្លួនឯង',
        headerLeft: <CloseButton navigation={navigation}/>,
        headerRight: <Provider store={store}>
                        <SaveButton navigation={navigation}/>
                      </Provider>
      })
    },
    CareerDetailScreen: { screen: CareerDetailScreen },
    SubjectScreen: {
      screen: SubjectScreen,
      navigationOptions: ({navigation}) => ({
        title: 'បំពេញមុខវិជ្ជា',
        headerLeft: <CloseButton navigation={navigation}/>,
      })
    },
    PersonalityScreen: {
      screen: PersonalityScreen,
      navigationOptions: ({navigation}) => ({
        title: 'បំពេញបុគ្គលិកលក្ខណៈ',
        headerLeft: <CloseButton navigation={navigation}/>
      })
    },
    PersonalityJobsScreen: { screen: PersonalityJobsScreen },
    SummaryScreen: {
      screen: SummaryScreen,
      navigationOptions: ({navigation}) => ({
        title: 'ជ្រើសរើសមុខរបរចេញពីតារាងសង្ខេបលទ្ធផល',
        headerLeft: <CloseButton navigation={navigation}/>
      })
    },
    RecommendationScreen: {
      screen: RecommendationScreen,
      navigationOptions: ({navigation}) => ({
        title: 'ការផ្តល់អនុសាសន៍',
        headerLeft: <CloseButton navigation={navigation}/>
      })
    },
    GoalScreen: {
      screen: GoalScreen,
      navigationOptions: ({navigation}) => ({
        title: 'ដាក់គោលដៅមួយ និងមូលហេតុ',
        headerLeft: <CloseButton navigation={navigation}/>
      })
    },
    ContactScreen: {
      screen: ContactScreen,
      navigationOptions: ({navigation}) => ({
        title: 'ព័ត៌មានសាលា និងទំនាក់ទំនង',
        headerLeft: <CloseButton navigation={navigation}/>
      })
    },
    CareersScreen: {
      screen: CareersScreen,
      navigationOptions: ({navigation}) => ({
        title: 'យល់ដឹងអំពីមុខរបរ',
        headerLeft: <CloseButton navigation={navigation}/>
      })
    },
    InstitutionDetail: {
      screen: InstitutionDetail
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
  },
  {
    navigationOptions: ({navigation}) => ({
      headerTitleStyle: headerStyles.headerTitleStyle,
      headerStyle: headerStyles.headerStyle,
      headerLeft: <BackButton navigation={navigation}/>
    })
  },
  {
    initialRouteName: 'CareerCounsellorScreen',
  }
);

export default CareerCounsellorStack;
