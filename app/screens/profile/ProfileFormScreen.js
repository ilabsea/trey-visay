import React, { Component, useState, useEffect } from 'react';
import {
  Platform,
  StatusBar,
} from 'react-native';

import User from '../../models/User';
import Sidekiq from '../../utils/models/sidekiq';
import Color from '../../themes/color';
import FormScreen from './Form';

import { useSelector, useDispatch } from 'react-redux'
import { setCurrentUser } from '../../redux/features/user/userSlice';

const ProfileFormScreen = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (Platform.OS == 'android') {
      StatusBar.setBackgroundColor(Color.grayStatusBar);
      StatusBar.setBarStyle('dark-content');
    }
  }, [])

  const handleSubmit = (values) => {
    try {
      User.write(() => {
        let user = User.create(values);
        dispatch(setCurrentUser(user));

        navigation.navigate('PersonalUnderstandingTestScreen');
      })
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <FormScreen onSubmit={handleSubmit}/>
  )
}

export default ProfileFormScreen;
