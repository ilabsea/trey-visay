import React from 'react';
import {
  Text,
  TouchableOpacity
} from 'react-native';

import {
  createMaterialTopTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import headerStyles from '../../../assets/style_sheets/header';
import { FontSetting } from '../../../assets/style_sheets/font_setting';

import BackButton from '../../../components/shared/back_button';

import SchoolScreen from '../../school/school_screen';
import InstitutionDetail from '../school/institution_detail';

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
      fontSize: FontSetting.text,
    },
    style: {
      backgroundColor: '#1976d2'
    }
  },
});

const SchoolStack = createStackNavigator(
  {
    Root: {
      screen: InstitutionTab,
      navigationOptions: ({navigation, screenProps}) => ({
        title: 'គ្រឹះស្ថានសិក្សា',
        headerTitleStyle: [headerStyles.headerTitleStyle],
        headerStyle: headerStyles.headerStyle,
        headerLeft:(<BackButton navigation={screenProps.drawerNavigation}/>),
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

export default SchoolStack;
