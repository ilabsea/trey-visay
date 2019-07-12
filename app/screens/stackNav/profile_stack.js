import React, { Component } from 'react';

import { StatusBar, Platform } from 'react-native';
import { createStackNavigator } from  'react-navigation';
import { FontSetting } from '../../assets/style_sheets/font_setting';

import ProfileScreen from '../profile/profile';
import EditProfilePhoto from '../profile/edit_profile_photo';
import EditPersonalInfo from '../profile/edit_personal_info';
import ProfileForm from '../profile/profile_form';
import Login from '../Account/login';

import SaveButton from '../../components/shared/save_button';
import CloseButton from '../../components/shared/close_button';
import headerStyles from '../../assets/style_sheets/header';

const ProfileStack = createStackNavigator(
  {
    ProfileScreen: {
      screen: ProfileScreen,
      navigationOptions: ({navigation}) => ({
        header: null
      })
    },
    EditProfilePhoto: {
      screen: EditProfilePhoto,
      navigationOptions: ({navigation}) => ({
        title: 'កែតម្រូវប្រវត្តិរូប',
      })
    },
    EditPersonalInfo: {
      screen: EditPersonalInfo,
      navigationOptions: ({navigation}) => ({
        title: 'កែតម្រូវប្រវត្តិរូប',
      })
    },
    ProfileForm: {
      screen: ProfileForm,
      navigationOptions: ({navigation}) => ({
        header: null
      })
    },
    Login: {
      screen: Login,
      navigationOptions: ({navigation}) => ({
        header: null
      })
    },
  },
  {
    navigationOptions: ({
      headerTitleStyle: {
        fontSize: FontSetting.nav_title,
        fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'Kantumruy',
        fontWeight: '300'
      }
    })
  }
);

ProfileStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

export default ProfileStack;
