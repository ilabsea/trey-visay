import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MultiIntelligentHomeScreen from '../screens/MultiIntelligent/MultiIntelligentHomeScreen';
import IntelligentProfileScreen from '../screens/Profile/IntelligentProfileScreen';
import MultiIntelligentInstructionScreen from '../screens/MultiIntelligent/MultiIntelligentInstructionScreen';
import MultiIntelligentQuestionnaireScreen from '../screens/MultiIntelligent/MultiIntelligentQuestionnaireScreen';

const Stack = createNativeStackNavigator();

const MultiIntelligentStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MultiIntelligentHomeScreen" component={MultiIntelligentHomeScreen} options={{headerShown: false}} />
      <Stack.Screen name="IntelligentProfileScreen" component={IntelligentProfileScreen} options={{headerShown: false}} />
      <Stack.Screen name="MultiIntelligentInstructionScreen" component={MultiIntelligentInstructionScreen} options={{headerShown: false}} />
      <Stack.Screen name="MultiIntelligentQuestionnaireScreen" component={MultiIntelligentQuestionnaireScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}

export default MultiIntelligentStackNavigator