import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

// Screens
import Home from '../../home/home';
import VocationalStack from '../Vocational/VocationalStack';
import SchoolStack from '../School/SchoolStack';
import AccountStack from '../account_stack';
import CareerCounsellorStack from '../CareerCounsellor/CareerCounsellorStack';
import ProfileStack from '../profile_stack';

import VideoScreen from '../../Video/VideoScreen';

const HomeTab = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({navigation}) => ({
      tabBarLabel: 'ទំព័រដេីម',
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        return <MaterialIcon name='home' size={22} color={tintColor} />;
      },
    }),
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
    screen: ({ navigation }) => <SchoolScreen screenProps={{category: 'អង្គការ', navigation: navigation}}/>,
    navigationOptions: {
      tabBarLabel: 'ផ្សេងៗ',
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        return <AwesomeIcon name='ellipsis-h' size={24} color={tintColor} />;
      },
    }
  },
}, {
  tabBarPosition: 'top',
  animationEnabled: true,
});


const HomeStack = createStackNavigator({
  Home: {
    screen: HomeTab,
    navigationOptions: ({navigation}) => ({
      title: 'ទំព័រដេីម'
    }),
  },
  AccountStack: {
    screen: AccountStack,
    navigationOptions: ({navigation}) => ({
      header: null
    }),
  },
  SchoolStack: { screen: SchoolStack},
  VideoScreen: {
    screen: VideoScreen,
    header: { visible:false }
  },
  CareerCounsellorStack: { screen: CareerCounsellorStack },
  VocationalStack: { screen: VocationalStack }
}, {
  initialRouteName: 'Home',
});

export default HomeStack;
