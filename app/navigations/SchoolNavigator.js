import React from 'react';
import {
  Platform,
  StyleSheet,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import SchoolScreen from '../screens/school/SchoolScreen';
import SchoolFilterScreen from '../screens/school/filter/SchoolFilterScreen';
import MajorDetailScreen from '../screens/MajorDetails/MajorDetailScreen';

import { Colors } from '../assets/style_sheets/main/colors';
import { FontSetting } from '../assets/style_sheets/font_setting';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const headerStyle = {backgroundColor: '#fff'}
const colorStyle = Platform.OS == 'android' ? {color: '#111'} : {}

function SchoolNavigator() {
  return (
    <Stack.Navigator screenOptions={{}} initialRouteName="Root">
      <Stack.Screen name ="Root" component={SchoolScreen} options={{headerShown: false}} />
      <Stack.Screen name="SchoolFilterScreen" component={SchoolFilterScreen} options={{headerShown: false}}/>
      <Stack.Screen name="MajorDetailScreen" component={MajorDetailScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: FontSetting.nav_title,
    fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'KantumruyLight'
  }
});

export default SchoolNavigator;
