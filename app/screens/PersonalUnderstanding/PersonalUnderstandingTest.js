import React, {useRef} from 'react';
import { View, Platform, BackHandler} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { ScrollableHeader } from '../../components';
import Color from '../../themes/color';
import Toast, { DURATION } from 'react-native-easy-toast';
import keyword from '../../data/analytics/keyword';
import Quiz from '../../models/Quiz';
import QuestionForm from './QuestionForm';

import { Form, SubmitButton } from '../../components/forms';
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentQuiz } from '../../redux/features/quiz/quizSlice';
import { resetAnswer } from '../../redux/features/quiz/hollandSlice';
import useAuth from "../../auth/useAuth";
import personalUnderstandingHelper from '../../helpers/personal_understanding_helper';
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  q1: Yup.string().required("សូមជ្រើសរើស"),
  q2: Yup.string().required("សូមជ្រើសរើស"),
  q3: Yup.string().required("សូមបំពេញ"),
  q4: Yup.string().required("សូមជ្រើសរើស"),
  q4_1: Yup.string().when("q4", {
    is: (value) => personalUnderstandingHelper.isQuestionVisibleByCode("q4_1", value),
    then: (schema) => schema.required("សូមបំពេញ")
  }),
  q5: Yup.string().required("សូមជ្រើសរើស"),
  q5_1: Yup.array().when("q5", {
    is: (value) => personalUnderstandingHelper.isQuestionVisibleByCode("q5_1", value),
    then: (schema) => schema.min(1, "សូមជ្រើសរើស"),
  })
});

const initialValue = { q1: '', q2: '', q3: '', q4: '', q4_1: '', q5: '', q5_1: []};

export default PersonalUnderstandingTest = ({navigation}) => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const toastRef = useRef();
  const currentQuiz = useSelector((state) => state.currentQuiz.value);
  let backHandler = null

  useFocusEffect(
    React.useCallback(() => {
      backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.popToTop()
        return true;
      })
      return () => !!backHandler && backHandler.remove()
    }, [])
  )

  const renderContent = () => {
    return (<QuestionForm />)
  }

  const handleSubmit = (values, {resetForm}) => {
    if (!!values && !Object.keys(values).length) {
      return toastRef.current?.show('សូមបំពេញសំណួរខាងក្រោមជាមុនសិន...!', DURATION.SHORT);
    }

    let answers = {...values};
    answers.q5_1 = (answers.q5_1 || []).join(",")

    Quiz.write(() => {
      const quiz = Quiz.create({
        userUuid: user.uuid,
        selfUnderstandingResponse: answers,
        selfUnderstandingScore: personalUnderstandingHelper.getTotalScore(values)
      });
      if (!!currentQuiz) Quiz.delete(currentQuiz.uuid);
      dispatch(setCurrentQuiz(quiz));
      dispatch(resetAnswer());
    })
    navigation.navigate('HollandInstructionScreen');
  }

  return (
    <Form
      initialValues={ initialValue }
      validationSchema={ validationSchema }
      onSubmit={ handleSubmit }>
      <View style={{flex: 1}}>
        <ScrollableHeader
          backgroundColor={Color.blue}
          textColor={'#fff'}
          statusBarColor={Color.blueStatusBar}
          barStyle={'light-content'}
          renderContent={ renderContent }
          title={'ស្វែងយល់ពីខ្លួនឯង'}
          largeTitle={'ស្វែងយល់ពីខ្លួនឯង'}
          buttonColor={Color.whiteColor}
          onPressBack={() => navigation.popToTop()}
        />

        { <SubmitButton title="បន្តទៀត"/> }
      </View>

      <Toast ref={toastRef} positionValue={ Platform.OS == 'ios' ? 120 : 140 }/>
    </Form>
  )
}
