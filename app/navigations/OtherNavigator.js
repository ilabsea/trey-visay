import React from 'react';
import { Platform } from 'react-native';

import {
  createStackNavigator
} from 'react-navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import Others from '../screens/Others/Others';
import About from '../screens/About/About';
import TermsCondition from '../screens/TermsCondition/TermsCondition';

const Stack = createNativeStackNavigator();

function OtherNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Others">
      <Stack.Screen name="Others" component={Others} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="TermsCondition" component={TermsCondition} />
    </Stack.Navigator>
  );
}

export default OtherNavigator;
