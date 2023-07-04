import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MultiIntelligentHomeScreen from '../screens/MultiIntelligent/MultiIntelligentHomeScreen';
import ProfileFormScreen from '../screens/Profile/ProfileFormScreen';
import MultiIntelligentInstructionScreen from '../screens/MultiIntelligent/MultiIntelligentInstructionScreen';
import MultiIntelligentQuestionnaireScreen from '../screens/MultiIntelligent/MultiIntelligentQuestionnaireScreen';
import MultiIntelligentResultScreen from '../screens/MultiIntelligent/MultiIntelligentResultScreen';
import IntelligentDetailScreen from '../screens/IntelligentDetail/IntelligentDetailScreen';
import MultiIntelligentRecommendationScreen from '../screens/MultiIntelligent/MultiIntelligentRecommendationScreen';

const Stack = createNativeStackNavigator();

const MultiIntelligentStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MultiIntelligentHomeScreen" component={MultiIntelligentHomeScreen} options={{headerShown: false}} />
      <Stack.Screen name="ProfileFormScreen" component={ProfileFormScreen} options={{headerShown: false}} />
      <Stack.Screen name="MultiIntelligentInstructionScreen" component={MultiIntelligentInstructionScreen} options={{headerShown: false}} />
      <Stack.Screen name="MultiIntelligentQuestionnaireScreen" component={MultiIntelligentQuestionnaireScreen} options={{headerShown: false}} />
      <Stack.Screen name="MultiIntelligentResultScreen" component={MultiIntelligentResultScreen} options={{headerShown: false}} />
      <Stack.Screen name="IntelligentDetailScreen" component={IntelligentDetailScreen} options={{headerShown: false}} />
      <Stack.Screen name="MultiIntelligentRecommendationScreen" component={MultiIntelligentRecommendationScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}

export default MultiIntelligentStackNavigator