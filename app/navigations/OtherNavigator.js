import React from 'react';
import { Platform } from 'react-native';

import {
  createStackNavigator
} from 'react-navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import Others from '../screens/Others/Others';
import About from '../screens/About/About';

const Stack = createNativeStackNavigator();

function OtherNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Others">
      <Stack.Screen name="OthersScreen" component={Others} />
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
}

export default OtherNavigator;
