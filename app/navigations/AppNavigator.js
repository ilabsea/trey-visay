// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DeviceInfo from 'react-native-device-info';

import HomeScreen from '../screens/Home/HomeScreen';
import SchoolNavigator from './SchoolNavigator';
import HollandNavigator from './HollandNavigator';
import OtherNavigator from './OtherNavigator';
import { navigationRef } from '../hooks/RootNavigation';
import VideoScreen from '../screens/Video/VideoScreen';
import VocationalNavigator from './VocationalNavigator';
import CareerWebsiteNavigator from './CareerWebsiteNavigator';
import MultiIntelligentNavigator from './MultiIntelligentNavigator';
import InstitutionDetail from '../screens/school/institution_detail';
import MajorDetailScreen from '../screens/MajorDetails/MajorDetailScreen';
import { Platform } from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { FontSetting } from '../assets/style_sheets/font_setting';
import {getStyleOfDevice} from '../utils/responsive_util';

const Tab = createBottomTabNavigator();

function HomeTab() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarLabelStyle: {
        lineHeight: Platform.OS == 'android' ? 20 : 0,
        fontSize: FontSetting.sub_title -1,
        paddingBottom: 2
      },
      tabBarStyle: (Platform.OS == 'ios' && DeviceInfo.hasNotch()) && {paddingBottom: 14}
    }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarLabel: 'ទំព័រដេីម',
        tabBarIcon: ({ focused, horizontal, color }) => (<MaterialIcon name='home' size={getStyleOfDevice(30, 22)} color={color} />),
      }} />
      {/*<Tab.Screen name="Profile" component={ProfileStack} options={{
        tabBarLabel: 'ប្រវត្តិរូបសង្ខេប',
        tabBarIcon: ({ focused, horizontal, tintColor }) => (<AwesomeIcon name='user' size={22} color={tintColor} />),
        // unmountOnBlur: true
      }} />*/}
      <Tab.Screen name="Others" component={OtherNavigator} options={{
        tabBarLabel: 'ផ្សេងៗ',
        tabBarIcon: ({ focused, horizontal, color }) => (<AwesomeIcon name='ellipsis-h' size={getStyleOfDevice(28, 24)} color={color} />)
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
        <Stack.Screen name="MultiIntelligentNavigator" component={MultiIntelligentNavigator} options={{}}/>
        <Stack.Screen name="SchoolNavigator" component={SchoolNavigator} options={{}}/>
        <Stack.Screen name="HollandNavigator" component={HollandNavigator} options={{}}/>
        <Stack.Screen name="VideoScreen" component={VideoScreen} options={{}}/>
        <Stack.Screen name="VocationalNavigator" component={VocationalNavigator} options={{}}/>
        <Stack.Screen name="CareerWebsiteNavigator" component={CareerWebsiteNavigator} options={{}}/>
        <Stack.Screen name="InstitutionDetail" component={InstitutionDetail} options={{headerShown: false}}/>
        <Stack.Screen name="MajorDetailScreen" component={MajorDetailScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStack;
