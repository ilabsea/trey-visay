import React, { Component } from 'react';

import { createStackNavigator } from  'react-navigation';
import { Text } from 'react-native';

import ClusterScreen from '../../Vocational/cluster_screen';
import CareerIndexScreen from '../../Vocational/index_screen';
import CareerDetailScreen from '../../Vocational/career_detail_screen';
import InstitutionDetail from '../../school/institution_detail';
import Description from '../../Vocational/description';

import BackButton from '../../../components/shared/back_button';
import InfoButton from '../../../components/info_button';
import headerStyles from '../../../assets/style_sheets/header';

const VocationalStack = createStackNavigator(
  {
    ClusterScreen: {
      screen: ClusterScreen,
      navigationOptions: ({navigation}) => ({
        title: "ជំនាញវិជ្ជាជីវៈ",
        headerLeft: <BackButton navigation={navigation}/>,
        headerRight: <InfoButton navigation={navigation}/>
      })
    },
    CareerIndexScreen: {
      screen: CareerIndexScreen,
      navigationOptions: ({navigation}) => ({
        title: navigation.state.params.title
      })
    },
    CareerDetailScreen: {
      screen: CareerDetailScreen,
      navigationOptions: ({navigation}) => ({
        title: navigation.state.params.career.name
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
    }
  },{
    navigationOptions: ({navigation}) => ({
      headerLeft: <BackButton navigation={navigation}/>,
      headerTitleStyle: headerStyles.headerTitleStyle,
      headerStyle: headerStyles.headerStyle,
    })
  }
);

export default VocationalStack;
