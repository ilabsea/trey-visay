import React, { Component } from 'react';

import { StatusBar, Platform, Text } from 'react-native';
import { FontSetting } from '../../assets/style_sheets/font_setting';

import ProfileScreen from '../profile/ProfileInfo';
import EditProfilePhoto from '../profile/edit_profile_photo';
import EditPersonalInfo from '../profile/edit_personal_info';
import ProfileForm from '../profile/profile_form';
import Login from '../Account/login';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function ProfileStack() {
  return (
      <Stack.Navigator initialRouteName="ProfileScreen">
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerShown: false}}/>
        <Stack.Screen name="EditProfilePhoto" component={EditProfilePhoto} options={{title: "កែតម្រូវប្រវត្តិរូប"}}/>
        <Stack.Screen name="EditPersonalInfo" component={EditPersonalInfo} options={{title: "កែតម្រូវប្រវត្តិរូប"}}/>
        <Stack.Screen name="ProfileForm" component={ProfileForm} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
      </Stack.Navigator>
  );
}
// Todo:
// ProfileStack.navigationOptions = ({ navigation }) => {
//   let tabBarVisible = true;
//   if (navigation.state.index > 0) {
//     tabBarVisible = false;
//   }

//   return {
//     tabBarVisible,
//   };
// };

export default ProfileStack;
