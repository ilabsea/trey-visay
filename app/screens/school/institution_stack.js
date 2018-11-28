import React from 'react';
import {
  Text,
  TouchableOpacity
} from 'react-native';

import {
  createMaterialTopTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import headerStyles from '../../assets/style_sheets/header';

import OpenDrawer from '../../components/open_drawer';

import PrivateSchoolScreen from './private_school_screen';
import NGOSchoolScreen from './ngo_school_screen';
import GovernmentSchoolScreen from './government_school_screen';
import InstitutionDetail from './institution_detail';

const InstitutionTab = createMaterialTopTabNavigator({
  GovernmentSchoolScreen: { screen: GovernmentSchoolScreen , navigationOptions: {tabBarLabel: 'សាលារដ្ឋ'}},
  PrivateSchoolScreen: { screen: PrivateSchoolScreen , navigationOptions: {tabBarLabel: 'សាលាឯកជន'}},
  NGOSchoolScreen: { screen: NGOSchoolScreen, navigationOptions: {tabBarLabel: 'អង្គការ'} },
}, {
  tabBarPosition: 'top',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#fff',
    labelStyle: {
      fontWeight: 'bold',
      fontSize: 14,
    },
    style: {
      backgroundColor: '#1976d2'
    }
  },
});

const InstitutionStack = createStackNavigator({
  Root: {
    screen: InstitutionTab,
    navigationOptions: ({navigation, screenProps}) => ({
      title: 'គ្រឹះស្ថានសិក្សា',
      headerTitleStyle: [headerStyles.headerTitleStyle],
      headerStyle: headerStyles.headerStyle,
      headerLeft:(<OpenDrawer navigation={screenProps.drawerNavigation}/>)})
  },
  InstitutionDetail: {
    screen: InstitutionDetail
  }
});

export default InstitutionStack;
