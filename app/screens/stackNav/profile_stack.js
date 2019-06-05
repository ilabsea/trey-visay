import React, { Component } from 'react';
import { createStackNavigator } from  'react-navigation';

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
        title: 'កែសម្រួល',
        headerTitleStyle: headerStyles.headerTitleStyle,
        headerStyle: headerStyles.headerStyleProfile,
        headerLeft: <CloseButton navigation={navigation}/>
      })
    },
    EditPersonalInfo: {
      screen: EditPersonalInfo,
      navigationOptions: ({navigation}) => ({
        title: 'កែសម្រួល',
        headerTitleStyle: headerStyles.headerTitleStyle,
        headerStyle: headerStyles.headerStyleProfile,
        headerLeft: <CloseButton navigation={navigation}/>
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
  }
);

export default ProfileStack;
