import React, { Component } from 'react';

import { createStackNavigator } from  'react-navigation';

import {
  Text
} from 'react-native';

import VocationalJobIndexScreen from '../vocational_job/index_screen';
import VocationalJobShowScreen from '../vocational_job/show_screen';
import InstitutionDetail from '../school/institution_detail';

import BackButton from '../../components/back_button';
import OpenDrawer from '../../components/open_drawer';
import headerStyles from '../../assets/style_sheets/header';

const VocationalJobStack = createStackNavigator(
  {
    VocationalJobIndexScreen: {
      screen: VocationalJobIndexScreen,
      navigationOptions: ({navigation}) => ({
        title: "ជំនាញវិជ្ជាជីវៈ",
        headerLeft: <OpenDrawer navigation={navigation}/>
      })
    },
    VocationalJobShowScreen: {
      screen: VocationalJobShowScreen,
      navigationOptions: ({navigation}) => ({
        title: navigation.state.params.title,
        headerTitleStyle: headerStyles.headerTitleStyle,
        headerLeft: <BackButton navigation={navigation}/>
      })
    },
    InstitutionDetail: {
      screen: InstitutionDetail
    },
  },{
    navigationOptions: ({navigation}) => ({
      headerTitleStyle: headerStyles.headerTitleStyle,
      headerStyle: headerStyles.headerStyle,
    })
  }
);

export default VocationalJobStack;
