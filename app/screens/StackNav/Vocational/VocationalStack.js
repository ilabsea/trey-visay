import React, { Component } from 'react';

import { createStackNavigator } from  'react-navigation';
import { Text, Platform } from 'react-native';

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
        header: null
      }),
    },
    CareerIndexScreen: {
      screen: CareerIndexScreen,
      navigationOptions: ({navigation}) => ({
        title: navigation.state.params.title,
      })
    },
    CareerDetailScreen: {
      screen: CareerDetailScreen,
      navigationOptions: ({navigation}) => ({
      })
    },
    InstitutionDetail: {
      screen: InstitutionDetail,
      navigationOptions: ({navigation}) => ({
        header: null
      })
    },
    Description: {
      screen: Description,
      navigationOptions: ({navigation}) => ({
        title: navigation.state.params.title
      })
    }
  },
  {
    navigationOptions: ({
      headerStyle: {
        marginTop: Platform.OS == 'android' ? 24: 0
      },
    })
  }
);

export default VocationalStack;
