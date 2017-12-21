import React from 'react';
import {
  TabNavigator,
  StackNavigator,
} from 'react-navigation';

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
  },
});

const StacksOverTabs = StackNavigator({
  Root: {
    screen: InstitutionTab,
    navigationOptions: { title: 'Header title' }
  },
  InstitutionDetail: {
    screen: InstitutionDetail,
  },
});

export default StacksOverTabs;
