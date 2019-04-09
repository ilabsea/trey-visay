import React, { Component } from 'react';

import { createStackNavigator } from  'react-navigation';

import {
  Text
} from 'react-native';

import VocationalJobIndexScreen from '../vocational_job/jobs/index_screen';
import VocationalJobShowScreen from '../vocational_job/job_detail/show_screen';
import InstitutionDetail from '../school/institution_detail';
import Description from '../vocational_job/description';

import BackButton from '../../components/shared/back_button';
import InfoButton from '../../components/info_button';
import OpenDrawer from '../../components/shared/open_drawer';
import headerStyles from '../../assets/style_sheets/header';

const VocationalJobStack = createStackNavigator(
  {
    VocationalJobIndexScreen: {
      screen: VocationalJobIndexScreen,
      navigationOptions: ({navigation}) => ({
        title: "ជំនាញវិជ្ជាជីវៈ",
        headerLeft: <OpenDrawer navigation={navigation}/>,
        headerRight: <InfoButton navigation={navigation}/>
      })
    },
    VocationalJobShowScreen: {
      screen: VocationalJobShowScreen,
      navigationOptions: ({navigation}) => ({
        title: navigation.state.params.title,
        headerRight: <InfoButton navigation={navigation}/>
      })
    },
    InstitutionDetail: {
      screen: InstitutionDetail
    },
    Description: {
      screen: Description,
      navigationOptions: ({navigation}) => ({
        title: navigation.state.params.title
      })
    },
  },{
    navigationOptions: ({navigation}) => ({
      headerLeft: <BackButton navigation={navigation}/>,
      headerTitleStyle: headerStyles.headerTitleStyle,
      headerStyle: headerStyles.headerStyle,
    })
  }
);

export default VocationalJobStack;
