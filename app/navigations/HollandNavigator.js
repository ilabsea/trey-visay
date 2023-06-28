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

import MajorSelectMultipleScreen from '../screens/MajorSelection/MajorSelectMultipleScreen';
import MajorSelectOneScreen from '../screens/MajorSelection/MajorSelectOneScreen';
import MajorDetailScreen from '../screens/MajorDetails/MajorDetailScreen';
import MajorRecommendationScreen from '../screens/MajorSelection/MajorRecommendationScreen';

import JobSelectMultipleScreen from '../screens/JobSelection/JobSelectMultipleScreen';
import JobSelectOneScreen from '../screens/JobSelection/JobSelectOneScreen';
import JobDetailScreen from '../screens/JobSelection/JobDetailScreen';
import JobRecommendationScreen from '../screens/JobSelection/JobRecommendationScreen';

import HollandDetailScreen from '../screens/HollandTest/HollandDetailScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function CareerCounsellorStack() {
  return(
    <Stack.Navigator screenOptions={{ }} initialRouteName='HollandHomeScreen'>
      <Stack.Screen name="HollandHomeScreen" component={HollandHomeScreen} options={{headerShown: false}} />
      <Stack.Screen name="HollandAboutScreen" component={HollandAboutScreen} options={{headerShown: false}} />
      <Stack.Screen name="ProfileFormScreen" component={ProfileFormScreen} options={{headerShown: false}} />

      <Stack.Screen name="HollandInstructionScreen" component={HollandInstructionScreen} options={{headerShown: false}} />
      <Stack.Screen name="PersonalUnderstandingTestScreen" component={PersonalUnderstandingTest} options={{headerShown: false}} />
      <Stack.Screen name="HollandQuestionnaireScreen" component={HollandQuestionnaireScreen} options={{headerShown: false}} />
      <Stack.Screen name="HollandTestResultScreen" component={HollandTestResultScreen} options={{headerShown: false}} />

      <Stack.Screen name="MajorSelectMultipleScreen" component={MajorSelectMultipleScreen} options={{headerShown: false}} />
      <Stack.Screen name="MajorSelectOneScreen" component={MajorSelectOneScreen} options={{title: "ជម្រើសជំនាញកម្រិតឧត្តមសិក្សា"}} />
      <Stack.Screen name="MajorDetailScreen" component={MajorDetailScreen} options={{headerShown: false}} />
      <Stack.Screen name="MajorRecommendationScreen" component={MajorRecommendationScreen} options={{headerShown: false}} />

      <Stack.Screen name="JobSelectMultipleScreen" component={JobSelectMultipleScreen} options={{headerShown: false}} />
      <Stack.Screen name="JobSelectOneScreen" component={JobSelectOneScreen} options={{title: "ជម្រើសអាជីពការងារ"}} />
      <Stack.Screen name="JobDetailScreen" component={JobDetailScreen} options={{headerShown: false}} />
      <Stack.Screen name="JobRecommendationScreen" component={JobRecommendationScreen} options={{headerShown: false}} />

      <Stack.Screen name="HollandDetailScreen" component={HollandDetailScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}

export default CareerCounsellorStack;
