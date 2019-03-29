import React from 'react';
import {
  Text,
  TouchableOpacity
} from 'react-native';

import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import headerStyles from '../../assets/style_sheets/header';
import { FontSetting } from '../../assets/style_sheets/font_setting';

import OpenDrawer from '../../components/open_drawer';
import BackButton from '../../components/back_button';

import SchoolScreen from './school_screen';
import InstitutionDetail from './institution_detail';

const InstitutionTab = createBottomTabNavigator({
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
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#fff',
    showIcon: false,
    allowFontScaling: true,
    labelStyle: {
      fontSize: FontSetting.tab_label,
    },
    style: {
      backgroundColor: '#1976d2'
    }
  },
});

const InstitutionStack = createStackNavigator(
  {
    Root: {
      screen: InstitutionTab,
      navigationOptions: ({navigation, screenProps}) => ({
        title: 'គ្រឹះស្ថានសិក្សា',
        headerTitleStyle: [headerStyles.headerTitleStyle],
        headerStyle: headerStyles.headerStyle,
        headerLeft:(<OpenDrawer navigation={screenProps.drawerNavigation}/>),
      })
    },
    InstitutionDetail: {
      screen: InstitutionDetail
    },
  },
  {
    navigationOptions: ({navigation}) => ({
      headerTitleStyle: headerStyles.headerTitleStyle,
      headerStyle: headerStyles.headerStyle,
      headerLeft: <BackButton navigation={navigation}/>
    })
  }
);

export default InstitutionStack;
