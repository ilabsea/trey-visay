import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MultiIntelligentHomeScreen from '../screens/MultiIntelligent/MultiIntelligentHomeScreen';

const Stack = createNativeStackNavigator();

const MultiIntelligentStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MultiIntelligentHomeScreen" component={MultiIntelligentHomeScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}

export default MultiIntelligentStackNavigator