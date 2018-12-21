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

import SchoolScreen from './school_screen';
import InstitutionDetail from './institution_detail';

const InstitutionTab = createMaterialTopTabNavigator({
  GovernmentSchoolScreen: {
    screen: ({ navigation }) => <SchoolScreen screenProps={{category: 'សាលារដ្ឋ', navigation: navigation }} />,
    navigationOptions: {tabBarLabel: 'សាលារដ្ឋ'}
  },
  PrivateSchoolScreen: {
    screen: ({ navigation }) => <SchoolScreen screenProps={{category: 'សាលាឯកជន', navigation: navigation}}/> ,
    navigationOptions: {tabBarLabel: 'សាលាឯកជន'}
  },
  NGOSchoolScreen: {
    screen: ({ navigation }) => <SchoolScreen screenProps={{category: 'អង្គការ', navigation: navigation}}/>,
    navigationOptions: {tabBarLabel: 'អង្គការ'}
  },
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
