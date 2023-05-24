import React, {useState} from 'react'
import { View, TouchableOpacity } from 'react-native'
import {
  FooterBar,
  Text,
  BackButton,
  BackConfirmDialog,
  ProgressStep,
  RatingGroup,
  ScrollableHeader,
} from '../../components';

import Color from '../../themes/color';
import scrollHeaderStyles from '../../assets/style_sheets/scroll_header';
import paginate from '../../utils/paginate_util';
import { Card } from 'react-native-paper';

import list_questions from './json/list_questions';
import ratings from './json/list_ratings'
import { Form, SubmitButton } from '../../components/forms';
import * as Yup from "yup";

import { useSelector, useDispatch } from 'react-redux'
import { appendAnswer, resetAnswer } from '../../redux/features/quiz/hollandSlice';
import Quiz from '../../models/Quiz';
import { setCurrentQuiz } from '../../redux/features/quiz/quizSlice';

export default HollandQuestionnaireScreen = ({route, navigation}) => {
  // Pagination
  const pageSize = 6
  const [page, setPage] = useState(route.params?.page || 1);
  const [questions, setQuestions] = useState(paginate(list_questions, pageSize, page));
  const isPageEnd = page * pageSize >= list_questions.length;

  // Redux
  const currentHollandResponse = useSelector((state) => state.currentHolland.value);
  const currentQuiz = useSelector((state) => state.currentQuiz.value);
  const dispatch = useDispatch();

  // Form validation
  let validations = {};
  for(let i=0; i<questions.length; i++) {
    validations[questions[i].code] = Yup.string().required("សូមជ្រើសរើស");
  }
  const validationSchema = Yup.object().shape(validations);

  // Form initial value
  const formValues = {};
  for(let i=0; i<questions.length; i++) {
    formValues[questions[i].code] = currentHollandResponse[questions[i].code] || "";
  }

  const sumValue = (values, code) => {
    let total = 0;

    for(i=0; i<7; i++) {
      total += values[`${code}_0${i+1}`];
    }

    return total;
  }

  const totalScore = (values) => {
    let columns = ['R', 'I', 'A', 'S', 'E', 'C'];
    let obj = {};

    for(let i=0; i<columns.length; i++) {
      obj[columns[i]] = sumValue(values, columns[i])
    }

    return obj;
  }

  const handleSubmit = (values, {errors}) => {
    dispatch(appendAnswer(values));

    if (isPageEnd) {
      let responses = {...currentHollandResponse, ...values}

      Quiz.write(()=> {
        currentQuiz.step = 1
        currentQuiz.hollandResponse = responses
        currentQuiz.totalScore = totalScore(responses)

        dispatch(setCurrentQuiz(currentQuiz));
        // dispatch(resetAnswer()); Todo: uncommend this one when done
      })

      return navigation.navigate('HollandTestResultScreen');
    }

    navigation.push('HollandQuestionnaireScreen', {page: page + 1});
  }

  const renderQuestion = (question, index) => {
    return (
      <Card key={index} style={{marginVertical: 8, padding: 8}} >
        <Text>{index + 1}) {question.name}</Text>

        <View style={{alignItems: 'center'}}>
          <RatingGroup name={question.code} options={ratings}/>
        </View>
      </Card>
    )
  }

  const renderContent = () => {
    return (
      <View style={{marginVertical: 8}}>
        { questions.map(renderQuestion) }
      </View>
    )
  }

  const renderNavigation = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <BackButton buttonColor='#fff' style={{width: 48}}/>
        <Text style={[scrollHeaderStyles.navTitle, { paddingTop: 2, flex: 1, textAlign: 'center', justifyContent: 'center' }]}>តេស្តបុគ្គលិកលក្ខណៈ</Text>
        <Text style={{color: '#fff', marginRight: 8, width: 48}}>{0} / 6</Text>
      </View>
    )
  }

  return (
    <Form
      initialValues={formValues}
      onSubmit={ handleSubmit }
      validationSchema={validationSchema} >

      <View style={{flex: 1}}>
        <ScrollableHeader
          backgroundColor={Color.blue}
          statusBarColor={Color.blueStatusBar}
          barStyle={'light-content'}
          renderContent={ renderContent }
          renderNavigation={ renderNavigation }
          headerMaxHeight={140}
          renderForeground={ () => <ProgressStep step={page} /> }
        />

        <SubmitButton title='បន្តទៀត' />
      </View>
    </Form>
  )
}
