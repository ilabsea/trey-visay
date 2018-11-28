import React, { Component } from 'react';

import { createStackNavigator } from  'react-navigation';

import Profile from '../profile/profile';
import EditProfilePhoto from '../profile/edit_profile_photo';
import EditPersonalInfo from '../profile/edit_personal_info';
import EditFamilyInfo from '../profile/edit_family_info';
import EditFamilySituation from '../profile/edit_family_situation';

const ProfileStack = createStackNavigator(
  {
    Profile: {screen: Profile},
    EditProfilePhoto: {screen: EditProfilePhoto},
    EditPersonalInfo: {screen: EditPersonalInfo},
    EditFamilyInfo: {screen: EditFamilyInfo},
    EditFamilySituation: {screen: EditFamilySituation},
  }
);

export default ProfileStack;
