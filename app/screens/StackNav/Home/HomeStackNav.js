import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';

import { Platform } from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { FontSetting } from '../../../assets/style_sheets/font_setting';

// Screens
import VocationalStack from '../Vocational/VocationalStack';
import SchoolStack from '../School/SchoolStack';
import AccountStack from '../account_stack';
import CareerCounsellorStack from '../CareerCounsellor/CareerCounsellorStack';
import ProfileStack from '../profile_stack';
import OthersStack from '../Others/OthersStack';
import HomeStack from '../Home/HomeStack';
import PersonalityAssessmentStack from '../Assessment/PersonalityAssessmentStack';

import VideoScreen from '../../Video/VideoScreen';

const HomeTab = createBottomTabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: ({navigation}) => ({
      tabBarLabel: 'ទំព័រដេីម',
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        return <MaterialIcon name='home' size={22} color={tintColor} />;
      },
    })
  },
  Profile: {
    screen: ProfileStack ,
    header: { visible:false },
    navigationOptions: {
      tabBarLabel: 'ប្រវត្តិរូបសង្ខេប',
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        return <AwesomeIcon name='user' size={22} color={tintColor} />;
      },
    }
  },
  Others: {
    screen: OthersStack,
    navigationOptions: {
      headerTitle: 'ផ្សេងៗ',
      tabBarLabel: 'ផ្សេងៗ',
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        return <AwesomeIcon name='ellipsis-h' size={24} color={tintColor} />;
      },
    }
  },
}, {
    tabBarOptions: {
      labelStyle: { lineHeight: Platform.OS == 'android' ? 20 : 0}
    }
});


const HomeStackNav = createStackNavigator({
  Home: {
    screen: HomeTab,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  AccountStack: {
    screen: AccountStack,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  SchoolStack: { screen: SchoolStack,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  VideoScreen: {
    screen: VideoScreen,
    navigationOptions: ({navigation}) => ({
      header: null,
    })
  },
  CareerCounsellorStack: {
    screen: CareerCounsellorStack,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  PersonalityAssessmentStack: {
    screen: PersonalityAssessmentStack,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  VocationalStack: {
    screen: VocationalStack,
    navigationOptions: ({navigation}) => ({
      header: null,
    })
  }
}, {
  initialRouteName: 'Home'
});

export default HomeStackNav;
