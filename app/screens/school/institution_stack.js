import React from 'react';
import {
  TabNavigator,
  createStackNavigator,
} from 'react-navigation';

import headerStyles from '../../assets/style_sheets/header';

import PrivateSchoolScreen from './private_school_screen';
import NGOSchoolScreen from './ngo_school_screen';
import GovernmentSchoolScreen from './government_school_screen';
import InstitutionDetail from './institution_detail';

const InstitutionTab = TabNavigator({
  GovernmentSchoolScreen: { screen: GovernmentSchoolScreen },
  PrivateSchoolScreen: { screen: PrivateSchoolScreen },
  NGOSchoolScreen: { screen: NGOSchoolScreen },
}, {
  tabBarPosition: 'top',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#fff',
    labelStyle: {
      fontFamily: 'Kantumruy',
      fontWeight: 'bold',
      fontSize: 14,
    },
    style: {
      backgroundColor: '#1976d2'
    }
  },
});

const StacksOverTabs = createStackNavigator({
  Root: {
    screen: InstitutionTab
  },
  InstitutionDetail: {
    screen: InstitutionDetail,
  }
});

export default StacksOverTabs;
