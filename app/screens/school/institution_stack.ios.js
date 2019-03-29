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
import Filter from '../../components/schools/filter';
import BackButton from '../../components/back_button';
import SaveButton from '../../components/save_button';

import SchoolScreen from './school_screen';
import InstitutionDetail from './institution_detail';
import FilterScreen from './filter/filter_screen';
import FilterProvinces from './filter/filter_provinces';
import FilterMajors from './filter/filter_majors';

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
    activeTintColor: '#007AFF',
    showIcon: false,
    allowFontScaling: true,
    labelStyle: {
      fontSize: FontSetting.tab_label,
    },
    style: {
      backgroundColor: '#EFEFF4'
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
        headerRight:(<Filter screenProps={{navigation: navigation}} />)
      })
    },
    InstitutionDetail: {
      screen: InstitutionDetail
    },
    FilterScreen: {
      screen: FilterScreen
    },
    FilterProvinces: {
      screen: FilterProvinces,
      navigationOptions: ({navigation, screenProps}) => ({
        title: 'ជ្រេីសរេីសទីតាំង',
        headerRight:(<SaveButton noIcon={true} navigation={navigation} />)
      })
    },
    FilterMajors: {
      screen: FilterMajors,
      navigationOptions: ({navigation, screenProps}) => ({
        title: 'ជ្រេីសរេីសជំនាញ',
        headerRight:(<SaveButton noIcon={true} navigation={navigation} />)
      })
    }
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
