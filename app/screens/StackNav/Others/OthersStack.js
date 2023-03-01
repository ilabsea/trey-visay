import React from 'react';
import { Platform } from 'react-native';

import {
  createStackNavigator
} from 'react-navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import Others from '../../Others/Others';
import About from '../../About/About';
import ChangePassword from '../../Account/change_password_screen';
import TermsCondition from '../../TermsCondition/TermsCondition';

const Stack = createNativeStackNavigator();

function OthersStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Others">
      <Stack.Screen name="Others" component={Others} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="TermsCondition" component={TermsCondition} />
    </Stack.Navigator>
  );
}

// OthersStack.navigationOptions = ({ navigation }) => {
//   let tabBarVisible = true;
//   if (navigation.state.index > 0) {
//     tabBarVisible = false;
//   }

//   return {
//     tabBarVisible,
//   };
// };

export default OthersStack;
