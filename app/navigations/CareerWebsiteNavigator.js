import React from 'react';

// Screens
import CareerCenterScreen from '../screens/CareerCenter/CareerCenterScreen';
import WebviewScreen from '../screens/Webview/WebviewScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function CareerWebsiteNavigator() {
  return (
    <Stack.Navigator initialRouteName="CareerCenterScreen">
      <Stack.Screen name="CareerCenterScreen" component={CareerCenterScreen} options={{headerShown: false}}/>
      <Stack.Screen name="NeaCareerScreen" component={WebviewScreen} options={{title: "ទីភ្នាក់ងារជាតិមុខរបរ និងការងារ"}}/>
      <Stack.Screen name="BongSreyCareerScreen" component={WebviewScreen} options={{title: "បងស្រី ទីប្រឹក្សាការងារ"}}/>
    </Stack.Navigator>
  )
}

export default CareerWebsiteNavigator;
