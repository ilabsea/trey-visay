// In App.js in a new project

import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/home/HomeScreen';
import SchoolNavigator from './SchoolNavigator';
import HollandNavigator from './HollandNavigator';
import OtherNavigator from './OtherNavigator';
import { navigationRef } from '../hooks/RootNavigation';
import VideoScreen from '../screens/Video/VideoScreen';
import VocationalNavigator from './VocationalNavigator';
import CareerWebsiteNavigator from './CareerWebsiteNavigator';

import { Platform } from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { FontSetting } from '../assets/style_sheets/font_setting';

const Tab = createBottomTabNavigator();

function HomeTab() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarLabelStyle: { lineHeight: Platform.OS == 'android' ? 20 : 0}
    }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{
        headerShown: true,
        title: "ត្រីវិស័យ",
        tabBarLabel: 'ទំព័រដេីម',
        tabBarIcon: ({ focused, horizontal, tintColor }) => (<MaterialIcon name='home' size={22} color={tintColor} />),
        headerLeft: () => (
          <Image source={require('../assets/images/logo.png')} style={{width: 40, height: 40, marginLeft: 16}} />
        ),
      }} />
      {/*<Tab.Screen name="Profile" component={ProfileStack} options={{
        tabBarLabel: 'ប្រវត្តិរូបសង្ខេប',
        tabBarIcon: ({ focused, horizontal, tintColor }) => (<AwesomeIcon name='user' size={22} color={tintColor} />),
        // unmountOnBlur: true
      }} />*/}
      <Tab.Screen name="Others" component={OtherNavigator} options={{
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
        <Stack.Screen name="SchoolNavigator" component={SchoolNavigator} options={{}}/>
        <Stack.Screen name="HollandNavigator" component={HollandNavigator} options={{}}/>
        <Stack.Screen name="VideoScreen" component={VideoScreen} options={{}}/>
        <Stack.Screen name="VocationalNavigator" component={VocationalNavigator} options={{}}/>
        <Stack.Screen name="CareerWebsiteNavigator" component={CareerWebsiteNavigator} options={{}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStack;
