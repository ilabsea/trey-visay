import React, { useEffect } from 'react';
import {
  Platform,
  StatusBar,
} from 'react-native';

import User from '../../models/User';
import SidekiqJob from '../../models/SidekiqJob';
import Color from '../../themes/color';
import FormScreen from './Form';

import { useSelector, useDispatch } from 'react-redux'
import { setCurrentUser } from '../../redux/features/user/userSlice';
import useAuth from "../../auth/useAuth";

const ProfileFormScreen = ({navigation}) => {
  const { logIn } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (Platform.OS == 'android') {
      StatusBar.setBackgroundColor(Color.grayStatusBar);
      StatusBar.setBarStyle('dark-content');
    }
  }, [])

  const handleSubmit = (values) => {
    navigation.navigate('MultiIntelligentInstructionScreen')
    // Todo: navigate to MTT instruction screen

    // try {
    //   User.write(() => {
    //     let user = User.create(values);
    //     SidekiqJob.create(user.uuid, 'uploadUser');

    //     logIn(user);

    //     navigation.navigate('PersonalUnderstandingTestScreen');
    //   })
    // } catch (e) {
    //   console.log(e);
    // }
  }

  return (
    <FormScreen onSubmit={handleSubmit}/>
  )
}

export default ProfileFormScreen;
