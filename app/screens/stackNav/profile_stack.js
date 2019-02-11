import React, { Component } from 'react';
import { createStackNavigator } from  'react-navigation';

import Profile from '../profile/profile';
import EditProfilePhoto from '../profile/edit_profile_photo';
import EditPersonalInfo from '../profile/edit_personal_info';
import EditFamilySituation from '../profile/edit_family_situation';

import SaveButton from '../../components/save_button';
import CloseButton from '../../components/close_button';
import headerStyles from '../../assets/style_sheets/header';

const ProfileStack = createStackNavigator(
  {
    Profile: {screen: Profile},
    EditProfilePhoto: {screen: EditProfilePhoto},
    EditPersonalInfo: {screen: EditPersonalInfo},
    EditFamilySituation: {screen: EditFamilySituation},
  },
  {
    navigationOptions: ({navigation}) => ({
      title: 'កែសម្រួល',
      headerTitleStyle: headerStyles.headerTitleStyle,
      headerStyle: headerStyles.headerStyleProfile,
      headerLeft: <CloseButton navigation={navigation}/>,
      headerRight: <SaveButton navigation={navigation}/>
    })
  }
);
export default ProfileStack;
