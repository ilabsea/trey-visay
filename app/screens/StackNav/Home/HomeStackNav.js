// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../home/home';
import ProfileStack from '../profile_stack';
import OthersStack from '../Others/OthersStack';
import AccountStack from '../account_stack';
import CareerCounsellorStack from '../CareerCounsellor/CareerCounsellorStack';
import PersonalityAssessmentStack from '../Assessment/PersonalityAssessmentStack';
import SchoolStack from '../School/SchoolStack';
import { navigationRef } from '../RootNavigation';
import VideoScreen from '../../Video/VideoScreen';
import VocationalStack from '../Vocational/VocationalStack';
import CareerCenterStack from '../CareerCenter/CareerCenterStack';

import { Platform } from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { FontSetting } from '../../../assets/style_sheets/font_setting';

const Tab = createBottomTabNavigator();

function HomeTab() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarLabelStyle: { lineHeight: Platform.OS == 'android' ? 20 : 0}
    }}>
      <Tab.Screen name="Home" component={Home} options={{
        tabBarLabel: 'ទំព័រដេីម',
        tabBarIcon: ({ focused, horizontal, tintColor }) => (<MaterialIcon name='home' size={22} color={tintColor} />)
      }} />
      <Tab.Screen name="Profile" component={ProfileStack} options={{
        tabBarLabel: 'ប្រវត្តិរូបសង្ខេប',
        tabBarIcon: ({ focused, horizontal, tintColor }) => (<AwesomeIcon name='user' size={22} color={tintColor} />),
        // unmountOnBlur: true
      }} />
      <Tab.Screen name="Others" component={OthersStack} options={{
        tabBarLabel: 'ផ្សេងៗ',
        tabBarIcon: ({ focused, horizontal, tintColor }) => (<AwesomeIcon name='ellipsis-h' size={24} color={tintColor} />)
      }}/>
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="HomeTab"
        screenOptions={{
          headerShown: false,
          headerTitleStyle: {
            fontSize: FontSetting.nav_title,
            fontFamily: Platform.OS === 'android' ? 'KantumruyLight' : 'HelveticaNeue',
          }
        }}
      >
        <Stack.Screen name="HomeTab" component={HomeTab} options={{}}/>
        <Stack.Screen name="AccountStack" component={AccountStack} options={{}}/>
        <Stack.Screen name="CareerCounsellorStack" component={CareerCounsellorStack} options={{}}/>
        <Stack.Screen name="PersonalityAssessmentStack" component={PersonalityAssessmentStack} options={{}}/>
        <Stack.Screen name="SchoolStack" component={SchoolStack} options={{}}/>
        <Stack.Screen name="VideoScreen" component={VideoScreen} options={{}}/>
        <Stack.Screen name="VocationalStack" component={VocationalStack} options={{}}/>
        <Stack.Screen name="CareerCenterStack" component={CareerCenterStack} options={{}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStack;
