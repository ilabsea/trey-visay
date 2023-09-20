import React from 'react';

// Screens
import CareerWebsiteHomeScreen from '../screens/CareerWebsite/CareerWebsiteHomeScreen';
import WebviewScreen from '../screens/CareerWebsite/WebviewScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function CareerWebsiteNavigator() {
  return (
    <Stack.Navigator initialRouteName="CareerWebsiteHomeScreen">
      <Stack.Screen name="CareerWebsiteHomeScreen" component={CareerWebsiteHomeScreen} options={{headerShown: false}}/>
      <Stack.Screen name="WebViewScreen" component={WebviewScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

export default CareerWebsiteNavigator;
