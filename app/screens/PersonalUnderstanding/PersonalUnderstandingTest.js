import React, {Component, useRef, useEffect} from 'react';
import {
  View,
  Platform,
} from 'react-native';

import { FooterBar, BackButton, ScrollableHeader } from '../../components';
import Color from '../../themes/color';
import Toast, { DURATION } from 'react-native-easy-toast';
import keyword from '../../data/analytics/keyword';
import Quiz from '../../models/Quiz';
import QuestionForm from './QuestionForm';

import { Form, SubmitButton } from '../../components/forms';
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentQuiz } from '../../redux/features/quiz/quizSlice';
import useAuth from "../../auth/useAuth";

export default PersonalUnderstandingTest = ({navigation}) => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const toastRef = useRef();
  const currentQuiz = useSelector((state) => state.currentQuiz.value);

  const renderContent = () => {
    return (<QuestionForm />)
  }

  const renderNavigation = () => {
    return (<BackButton buttonColor='#fff' onPress={() => navigation.popToTop()} />)
  }

  const handleSubmit = (values, {resetForm}) => {
    if (!!values && !Object.keys(values).length) {
      return toastRef.current?.show('សូមបំពេញសំណួរខាងក្រោមជាមុនសិន...!', DURATION.SHORT);
    }

    values.q5 = (values.q5 || []).join(",")

    Quiz.write(() => {
      quiz = Quiz.create({userUuid: user.uuid, selfUnderstandingReponse: values});
      if (!!currentQuiz) Quiz.delete(currentQuiz.uuid);

      dispatch(setCurrentQuiz(quiz));
    })

    navigation.navigate('HollandInstructionScreen');
  }

  return (
    <Form
      initialValues={{}}
      onSubmit={ handleSubmit }>

      <View style={{flex: 1}}>
        <ScrollableHeader
          backgroundColor={Color.blue}
          textColor={'#fff'}
          statusBarColor={Color.blueStatusBar}
          barStyle={'light-content'}
          renderContent={ renderContent }
          renderNavigation={ renderNavigation }
          title={'ស្វែងយល់ពីខ្លួនឯង'}
          largeTitle={'ស្វែងយល់ពីខ្លួនឯង'}
        />

        { <SubmitButton title="បន្តទៀត"/> }
      </View>

      <Toast ref={toastRef} positionValue={ Platform.OS == 'ios' ? 120 : 140 }/>
    </Form>
  )
}
