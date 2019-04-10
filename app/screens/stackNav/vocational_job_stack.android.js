import React, { Component } from 'react';

import { createStackNavigator } from  'react-navigation';

import {
  Text
} from 'react-native';

import VocationalJobIndexScreen from '../vocational_job/jobs/index_screen';
import VocationalJobShowScreen from '../vocational_job/job_detail/show_screen';
import InstitutionDetail from '../school/institution_detail';

import BackButton from '../../components/shared/back_button';
import headerStyles from '../../assets/style_sheets/header';

const VocationalJobStack = createStackNavigator(
  {
    VocationalJobIndexScreen: {
      screen: VocationalJobIndexScreen,
      navigationOptions: ({navigation}) => ({
        title: "ជំនាញវិជ្ជាជីវៈ",
        headerLeft: <BackButton navigation={navigation}/>,
      })
    },
    VocationalJobShowScreen: {
      screen: VocationalJobShowScreen,
      navigationOptions: ({navigation}) => ({
        title: navigation.state.params.title,
      })
    },
    InstitutionDetail: {
      screen: InstitutionDetail
    }
  },{
    navigationOptions: ({navigation}) => ({
      headerLeft: <BackButton navigation={navigation}/>,
      headerTitleStyle: headerStyles.headerTitleStyle,
      headerStyle: headerStyles.headerStyle,
    })
  }
);

export default VocationalJobStack;
