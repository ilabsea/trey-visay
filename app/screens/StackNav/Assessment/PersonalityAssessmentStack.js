import React, { Component } from 'react';

import { Platform, StatusBar } from 'react-native';
import { createStackNavigator } from  'react-navigation';

import headerStyles from '../../../assets/style_sheets/header';
import CloseButton from '../../../components/shared/close_button';
import NextButton from '../../../components/NextButton';
import SaveButton from '../../../components/shared/save_button';
import BackButton from '../../../components/shared/back_button';
import OpenDrawer from '../../../components/shared/open_drawer';
import { FontSetting } from '../../../assets/style_sheets/font_setting';

import PersonalityAssessment from '../../PersonalityAssessment/PersonalityAssessment';
import AboutPersonalityAssessment from '../../PersonalityAssessment/About';
import PersonalityAssessmentForm from '../../PersonalityAssessmentForm/PersonalityAssessmentForm';
import PersonalityAssessmentResult from '../../PersonalityAssessmentResult/PersonalityAssessmentResult';
import PersonalityAssessmentResultHistory from '../../PersonalityAssessmentResultHistory/PersonalityAssessmentResultHistory';
import PersonalityAssessmentMajorList from '../../PersonalityAssessmentMajorList/PersonalityAssessmentMajorList';
import PersonalityAssessmentMajorDetail from '../../PersonalityAssessmentMajorDetail/PersonalityAssessmentMajorDetail';
import PersonalityAssessmentPersonalityCategory from '../../PersonalityAssessmentPersonalityCategory/PersonalityAssessmentPersonalityCategory';
import PersonalityAssessmentHighSchoolStudyOption from '../../PersonalityAssessmentHighSchoolStudyOption/PersonalityAssessmentHighSchoolStudyOption';
import PersonalityAssessmentJobList from '../../PersonalityAssessmentJobList/PersonalityAssessmentJobList';
import PersonalityAssessmentJobDetail from '../../PersonalityAssessmentJobDetail/PersonalityAssessmentJobDetail';
import PersonalityAssessmentSubjectTip from '../../PersonalityAssessmentSubjectTip/PersonalityAssessmentSubjectTip';

const AssessmentStack = createStackNavigator(
  {
    PersonalityAssessmentScreen: {
      screen: PersonalityAssessment,
      navigationOptions: ({navigation}) => ({
        title: 'វាយតម្លៃមុខរបរនិងអាជីព',
        header: null
      })
    },
    AboutPersonalityAssessment: {
      screen: AboutPersonalityAssessment,
      navigationOptions: ({navigation}) => ({
        title: 'អំពីការធ្វើតេស្តស្វែងយល់បុគ្គលិកលក្ខណៈ'
      })
    },

    RealisticScreen: {
      screen: PersonalityAssessmentForm,
      navigationOptions: ({navigation}) => ({
        title: 'អនុវត្តតេស្តប្រាកដនិយម',
        headerLeft: <CloseButton navigation={navigation}/>,
        headerRight: <NextButton navigation={navigation}/>,
        header: null
      })
    },
    InvestigativeScreen: {
      screen: PersonalityAssessmentForm,
      navigationOptions: ({navigation}) => ({
        title: 'អនុវត្តតេស្តពូកែអង្កេត',
        headerLeft: <CloseButton navigation={navigation}/>,
        headerRight: <NextButton navigation={navigation}/>,
        header: null
      })
    },
    ArtisticScreen: {
      screen: PersonalityAssessmentForm,
      navigationOptions: ({navigation}) => ({
        title: 'អនុវត្តតេស្តសិល្បៈនិយម',
        headerLeft: <CloseButton navigation={navigation}/>,
        headerRight: <NextButton navigation={navigation}/>,
        header: null
      })
    },
    SocialScreen: {
      screen: PersonalityAssessmentForm,
      navigationOptions: ({navigation}) => ({
        title: 'អនុវត្តតេស្តសង្គម',
        headerLeft: <CloseButton navigation={navigation}/>,
        headerRight: <NextButton navigation={navigation}/>,
        header: null
      })
    },
    EnterprisingScreen: {
      screen: PersonalityAssessmentForm,
      navigationOptions: ({navigation}) => ({
        title: 'អនុវត្តតេស្តត្រិះរិះពិចារណា',
        headerLeft: <CloseButton navigation={navigation}/>,
        headerRight: <NextButton navigation={navigation}/>,
        header: null
      })
    },
    ConventionalScreen: {
      screen: PersonalityAssessmentForm,
      navigationOptions: ({navigation}) => ({
        title: 'អនុវត្តតេស្តសណ្ដាប់ធ្នាប់',
        headerLeft: <CloseButton navigation={navigation}/>,
        headerRight: <NextButton navigation={navigation}/>,
        header: null
      })
    },
    AssessmentResultScreen: {
      screen: PersonalityAssessmentResult,
      navigationOptions: ({navigation}) => ({
        title: 'បង្ហាញលទ្ធផល',
        headerLeft: <CloseButton navigation={navigation}/>,
        headerRight: <NextButton navigation={navigation} text='រួចរាល់' icon='done'/>,
        header: null
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
  },
  {
    navigationOptions: ({
      headerStyle: {
        // marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
      },
      headerTitleStyle: {
        fontSize: FontSetting.nav_title,
        fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'Kantumruy',
        fontWeight: '300'
      },
      headerBackTitle: null
    }),
    initialRouteName: 'PersonalityAssessmentScreen'
  }
);

export default AssessmentStack;
