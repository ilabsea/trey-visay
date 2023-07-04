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
import IntelligentQuiz from '../../models/IntelligentQuiz';
import {setCurrentQuiz} from '../../redux/features/quiz/intelligentQuizSlice';
import {resetAnswer} from '../../redux/features/quiz/intelligentSlice';

const ProfileFormScreen = ({navigation, route}) => {
  const { logIn } = useAuth();
  const dispatch = useDispatch();
  const currentIntelligentQuiz = useSelector((state) => state.currentIntelligentQuiz.value);

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
        SidekiqJob.create(user.uuid, 'uploadUser');

        logIn(user);
        handleRedirection(user);
      })
    } catch (e) {
      console.log(e);
    }
  }

  const handleRedirection = (user) => {
    if (route.params.type == 'hollandTest')
      return navigation.navigate('PersonalUnderstandingTestScreen')

    const intelligentQuiz = IntelligentQuiz.create({userUuid: user.uuid});
    if (!!currentIntelligentQuiz) IntelligentQuiz.delete(currentIntelligentQuiz.uuid);

    dispatch(setCurrentQuiz(intelligentQuiz));
    dispatch(resetAnswer());
    navigation.navigate('MultiIntelligentInstructionScreen');
  }

  return (
    <FormScreen onSubmit={handleSubmit}/>
  )
}

export default ProfileFormScreen;
