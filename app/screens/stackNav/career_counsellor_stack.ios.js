import React, { Component } from 'react';

import { createStackNavigator } from  'react-navigation';
import { Provider } from 'react-redux';
import store from '../../redux/store';

import headerStyles from '../../assets/style_sheets/header';
import CloseButton from '../../components/shared/close_button';
import NextButton from '../../components/NextButton';
import SaveButton from '../../components/shared/save_button';
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
import CareersScreen from '../CareerPlanningForm/careers_screen';
import InstitutionDetail from '../school/institution_detail';
import GameHistoryScreen from '../CareerPlanning/game_history_screen';
import PersonalUnderstandingReport from '../CareerPlanning/game_history/personal_understanding_report';
import SubjectReport from '../CareerPlanning/game_history/subject_report';
import PersonalityReport from '../CareerPlanning/game_history/personality_report';
import StudentPersonalityReport from '../CareerPlanning/game_history/student_personality_report';
import RecommendationReport from '../CareerPlanning/game_history/recommendation_report';

import Assessment from '../Assessment/Assessment';
import PersonalityAssessment from '../PersonalityAssessment/PersonalityAssessment';
import PersonalityAssessmentForm from '../PersonalityAssessmentForm/PersonalityAssessmentForm';
import PersonalityAssessmentResult from '../PersonalityAssessmentResult/PersonalityAssessmentResult';
import PersonalityAssessmentResultHistory from '../PersonalityAssessmentResultHistory/PersonalityAssessmentResultHistory';
import PersonalityAssessmentMajorList from '../PersonalityAssessmentMajorList/PersonalityAssessmentMajorList';
import PersonalityAssessmentMajorDetail from '../PersonalityAssessmentMajorDetail/PersonalityAssessmentMajorDetail';
import PersonalityAssessmentPersonalityCategory from '../PersonalityAssessmentPersonalityCategory/PersonalityAssessmentPersonalityCategory';
import PersonalityAssessmentHighSchoolStudyOption from '../PersonalityAssessmentHighSchoolStudyOption/PersonalityAssessmentHighSchoolStudyOption';
import PersonalityAssessmentJobList from '../PersonalityAssessmentJobList/PersonalityAssessmentJobList';
import PersonalityAssessmentJobDetail from '../PersonalityAssessmentJobDetail/PersonalityAssessmentJobDetail';
import PersonalityAssessmentSubjectTip from '../PersonalityAssessmentSubjectTip/PersonalityAssessmentSubjectTip';

const CareerCounsellorStack = createStackNavigator(
  {
    AssessmentScreen: {
      screen: Assessment,
      navigationOptions: ({navigation}) => ({
        title: 'វាយតម្លៃមុខរបរនិងអាជីព',
        headerLeft: <OpenDrawer navigation={navigation}/>
      })
    },
    PersonalityAssessmentScreen: {
      screen: PersonalityAssessment,
      navigationOptions: ({navigation}) => ({
        title: 'វាយតម្លៃមុខរបរនិងអាជីព',
      })
    },
    RealisticScreen: {
      screen: PersonalityAssessmentForm,
      navigationOptions: ({navigation}) => ({
        title: 'អនុវត្តតេស្តប្រាកដនិយម',
        headerLeft: <CloseButton navigation={navigation}/>
      })
    },
    InvestigativeScreen: {
      screen: PersonalityAssessmentForm,
      navigationOptions: ({navigation}) => ({
        title: 'អនុវត្តតេស្តពូកែអង្កេត',
        headerLeft: <CloseButton navigation={navigation}/>
      })
    },
    ArtisticScreen: {
      screen: PersonalityAssessmentForm,
      navigationOptions: ({navigation}) => ({
        title: 'អនុវត្តតេស្តសិល្បៈនិយម',
        headerLeft: <CloseButton navigation={navigation}/>
      })
    },
    SocialScreen: {
      screen: PersonalityAssessmentForm,
      navigationOptions: ({navigation}) => ({
        title: 'អនុវត្តតេស្តសង្គម',
        headerLeft: <CloseButton navigation={navigation}/>
      })
    },
    EnterprisingScreen: {
      screen: PersonalityAssessmentForm,
      navigationOptions: ({navigation}) => ({
        title: 'អនុវត្តតេស្តត្រិះរិះពិចារណា',
        headerLeft: <CloseButton navigation={navigation}/>
      })
    },
    ConventionalScreen: {
      screen: PersonalityAssessmentForm,
      navigationOptions: ({navigation}) => ({
        title: 'អនុវត្តតេស្តសណ្ដាប់ធ្នាប់',
        headerLeft: <CloseButton navigation={navigation}/>
      })
    },
    AssessmentResultScreen: {
      screen: PersonalityAssessmentResult,
      navigationOptions: ({navigation}) => ({
        title: 'បង្ហាញលទ្ធផល',
        headerLeft: <CloseButton navigation={navigation}/>
      })
    },
    AssessmentResultHistoryScreen: {
      screen: PersonalityAssessmentResultHistory,
      navigationOptions: ({navigation}) => ({
        title: 'លទ្ធផលតេស្ត',
      })
    },
    PersonalityCategoryScreen: {
      screen: PersonalityAssessmentPersonalityCategory,
      navigationOptions: ({navigation}) => ({
        title: `លទ្ធផលតេស្តបែប${navigation.getParam('title')}`,
      })
    },
    HighSchoolStudyOptionScreen: {
      screen: PersonalityAssessmentHighSchoolStudyOption,
      navigationOptions: ({navigation}) => ({
        title: `ជម្រើសនៃការសិក្សាកម្រិតមធ្យមសិក្សាទុតិយភូមិ`,
      })
    },
    MajorListScreen: {
      screen: PersonalityAssessmentMajorList,
      navigationOptions: ({navigation}) => ({
        title: `ជម្រើសនៃការសិក្សាកម្រិតឧត្តមសិក្សា`,
      })
    },
    MajorDetailScreen: {
      screen: PersonalityAssessmentMajorDetail,
      navigationOptions: ({navigation}) => ({
        title: `ការសិក្សាជំនាញ${navigation.getParam('title')}`,
      })
    },
    PersonalityAssessmentJobListScreen: {
      screen: PersonalityAssessmentJobList,
      navigationOptions: ({navigation}) => ({
        title: `ជម្រើសអាជីពការងារសក្ដិសម`,
      })
    },
    PersonalityAssessmentJobDetailScreen: {
      screen: PersonalityAssessmentJobDetail,
      navigationOptions: ({navigation}) => ({
        title: `ទំព័រលម្អិតពីអាជីព`,
      })
    },
    PersonalityAssessmentSubjectTipScreen: {
      screen: PersonalityAssessmentSubjectTip,
      navigationOptions: ({navigation}) => ({
        title: `គន្លឹះពង្រឹងមុខវិជ្ជា${navigation.getParam('title')}`,
      })
    },
    CareerCounsellorScreen: {
      screen: CareerCounsellor,
      navigationOptions: ({navigation}) => ({
        title: 'វាយតម្លៃមុខរបរនិងអាជីព',
        // headerLeft: <BackButton navigation={navigation}/>
        // headerLeft: <OpenDrawer navigation={navigation}/>
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
        headerRight: <NextButton navigation={navigation}/>,
      })
    },
    PersonalityScreen: {
      screen: PersonalityScreen,
      navigationOptions: ({navigation}) => ({
        title: 'បំពេញបុគ្គលិកលក្ខណៈ',
        headerLeft: <CloseButton navigation={navigation}/>,
        headerRight: <NextButton navigation={navigation}/>,
      })
    },
    PersonalityJobsScreen: {
      screen: PersonalityJobsScreen,
      navigationOptions: ({navigation}) => ({
        title: `${navigation.getParam('title')}`,
        headerLeft: <CloseButton navigation={navigation}/>,
        headerRight: <NextButton navigation={navigation}/>,
      })
    },
    SummaryScreen: {
      screen: SummaryScreen,
      navigationOptions: ({navigation}) => ({
        title: 'ជ្រើសរើសមុខរបរចេញពីតារាងសង្ខេបលទ្ធផល',
        headerLeft: <CloseButton navigation={navigation}/>,
        headerRight: <NextButton navigation={navigation}/>,
      })
    },
    RecommendationScreen: {
      screen: RecommendationScreen,
      navigationOptions: ({navigation}) => ({
        title: 'ការផ្តល់អនុសាសន៍',
        headerLeft: <CloseButton navigation={navigation}/>,
        headerRight: <NextButton navigation={navigation}/>,
      })
    },
    GoalScreen: {
      screen: GoalScreen,
      navigationOptions: ({navigation}) => ({
        title: 'ដាក់គោលដៅមួយ និងមូលហេតុ',
        headerLeft: <CloseButton navigation={navigation}/>,
        headerRight: <NextButton navigation={navigation}/>,
      })
    },
    ContactScreen: {
      screen: ContactScreen,
      navigationOptions: ({navigation}) => ({
        title: 'ព័ត៌មានសាលា និងទំនាក់ទំនង',
        headerLeft: <CloseButton navigation={navigation}/>,
        headerRight: <NextButton navigation={navigation} text='រួចរាល់' icon='done'/>,
      })
    },
    CareersScreen: {
      screen: CareersScreen,
      navigationOptions: ({navigation}) => ({
        title: 'យល់ដឹងអំពីមុខរបរ',
        headerLeft: <CloseButton navigation={navigation}/>,
        headerRight: <NextButton navigation={navigation}/>,
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
    }),
    // initialRouteName: 'CareerCounsellorScreen',
    initialRouteName: 'AssessmentScreen',
    // initialRouteName: 'PersonalityAssessmentScreen',
    // initialRouteName: 'HighSchoolStudyOptionScreen',
  }
);

export default CareerCounsellorStack;
