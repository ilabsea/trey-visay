import React, {useState} from 'react'
import { View, TouchableOpacity, ScrollView } from 'react-native'
import {
  Text,
  BackButton,
  BackConfirmDialog,
  ProgressStep,
  ScrollableHeader,
} from '../../components';

import Color from '../../themes/color';
import scrollHeaderStyles from '../../assets/style_sheets/scroll_header';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import HollandQuestionNavHeader from './components/HollandQuestionNavHeader';
import HollandQuestionItem from './components/HollandQuestionItem';
import Quiz from '../../models/Quiz';
import { Form, SubmitButton } from '../../components/forms';
import { useSelector, useDispatch } from 'react-redux';
import { appendAnswer, resetAnswer } from '../../redux/features/quiz/hollandSlice';
import { setCurrentQuiz } from '../../redux/features/quiz/quizSlice';
import { getQuestions, getForm, getHollandScore } from './services/question_service';

export default HollandQuestionnaireScreen = ({route, navigation}) => {
  // Redux
  const currentHollandResponse = useSelector((state) => state.currentHolland.value);
  const currentQuiz = useSelector((state) => state.currentQuiz.value);
  const dispatch = useDispatch();

  // Pagination and form validation
  const { questions, isPageEnd, page } = getQuestions(route.params?.page);
  const { validationSchema, initialValues } = getForm(questions, currentHollandResponse);

  const handleSubmit = (values, {errors}) => {
    dispatch(appendAnswer(values));

    if (isPageEnd) {
      let responses = {...currentHollandResponse, ...values}

      Quiz.write(()=> {
        currentQuiz.step = 1
        currentQuiz.hollandResponse = responses
        currentQuiz.hollandScore = getHollandScore(responses)

        dispatch(setCurrentQuiz(currentQuiz));
        // dispatch(resetAnswer()); Todo: uncommend this one when done
      })

      return navigation.navigate('HollandTestResultScreen');
    }

    navigation.push('HollandQuestionnaireScreen', {page: page + 1});
  }

  const renderContent = () => {
    return (
      <View style={{marginVertical: 8}}>
        { questions.map((q, index) =>
          <HollandQuestionItem question={q} index={index} key={index}/>)
        }
      </View>
    )
  }

  return (
    <Form
      initialValues={initialValues}
      onSubmit={ handleSubmit }
      validationSchema={validationSchema}
    >
      <HollandQuestionNavHeader/>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{backgroundColor: Color.blue, paddingHorizontal: 16, paddingTop: 8}}>
          <ProgressStep step={page}/>
        </View>
        {renderContent()}
      </ScrollView>
      <SubmitButton title='បន្តទៀត' />
    </Form>
  )
}
