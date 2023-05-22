import React, { Component } from 'react';
import { Platform, StatusBar } from 'react-native';

// HollandTest
import PersonalUnderstandingTest from '../screens/PersonalUnderstanding/PersonalUnderstandingTest';
import HollandHomeScreen from '../screens/HollandTest/HollandHomeScreen';
import HollandAboutScreen from '../screens/HollandTest/HollandAboutScreen';
import ProfileFormScreen from '../screens/Profile/ProfileFormScreen';
import HollandInstructionScreen from '../screens/HollandTest/HollandInstructionScreen';
import HollandQuestionnaireScreen from '../screens/HollandTest/HollandQuestionnaireScreen';
import HollandTestResultScreen from '../screens/HollandTest/HollandTestResultScreen';
import MajorSelectMultiple from '../screens/MajorSelection/MajorSelectMultiple';
import MajorSelectOne from '../screens/MajorSelection/MajorSelectOne';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function CareerCounsellorStack() {
  return(
    <Stack.Navigator screenOptions={{ }} initialRouteName='HollandHomeScreen'>
      <Stack.Screen name="HollandHomeScreen" component={HollandHomeScreen} options={{headerShown: false}} />
      <Stack.Screen name="HollandAboutScreen" component={HollandAboutScreen} options={{title: "អំពីការវាយតម្លៃមុខរបរនិងអាជីព"}} />
      <Stack.Screen name="ProfileFormScreen" component={ProfileFormScreen} options={{headerShown: false}} />
      <Stack.Screen name="HollandInstructionScreen" component={HollandInstructionScreen} options={{headerShown: false}} />
      <Stack.Screen name="PersonalUnderstandingTestScreen" component={PersonalUnderstandingTest} options={{headerShown: false}} />
      <Stack.Screen name="HollandQuestionnaireScreen" component={HollandQuestionnaireScreen} options={{headerShown: false}} />
      <Stack.Screen name="HollandTestResultScreen" component={HollandTestResultScreen} options={{headerShown: false}} />
      <Stack.Screen name="MajorSelectMultiple" component={MajorSelectMultiple} options={{title: "ជម្រើសជំនាញកម្រិតឧត្តមសិក្សា"}} />
      <Stack.Screen name="MajorSelectOne" component={MajorSelectOne} options={{title: "ជម្រើសជំនាញកម្រិតឧត្តមសិក្សា"}} />
    </Stack.Navigator>
  )
}

export default CareerCounsellorStack;
