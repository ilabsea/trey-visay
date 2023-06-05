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
      <Stack.Screen name="NeaCareerScreen" component={WebviewScreen} options={{title: "ទីភ្នាក់ងារជាតិមុខរបរ និងការងារ"}}/>
      <Stack.Screen name="BongSreyCareerScreen" component={WebviewScreen} options={{title: "បងស្រី ទីប្រឹក្សាការងារ"}}/>
    </Stack.Navigator>
  )
}

export default CareerWebsiteNavigator;
