import React from 'react'
import { Animated, View } from 'react-native'
import DeviceInfo from 'react-native-device-info'

import HollandQuestionNavHeader from './components/HollandQuestionNavHeader';
import HollandQuestionItem from './components/HollandQuestionItem';
import Quiz from '../../models/Quiz';
import { Form, SubmitButton } from '../../components/forms';
import { useSelector, useDispatch } from 'react-redux';
import { appendAnswer, resetAnswer } from '../../redux/features/quiz/hollandSlice';
import { setCurrentQuiz } from '../../redux/features/quiz/quizSlice';
import { getHollandQuestions, getForm, getHollandScore } from '../../services/question_service';
import SidekiqJob from '../../models/SidekiqJob';
import {getStyleOfOS} from '../../utils/responsive_util';

export default HollandQuestionnaireScreen = ({route, navigation}) => {
  // Redux
  const currentHollandResponse = useSelector((state) => state.currentHolland.value);
  const currentQuiz = useSelector((state) => state.currentQuiz.value);
  const dispatch = useDispatch();

  // Pagination and form validation
  const { questions, isPageEnd, page } = getHollandQuestions(route.params?.page);
  const { validationSchema, initialValues } = getForm(questions, currentHollandResponse);

  const scrollY = React.useRef(new Animated.Value(0));

  const handleSubmit = (values, {errors}) => {
    dispatch(appendAnswer(values));

    if (isPageEnd) {
      let responses = {...currentHollandResponse, ...values}

      Quiz.write(()=> {
        currentQuiz.step = 1
        currentQuiz.hollandResponse = responses
        currentQuiz.hollandScore = getHollandScore(responses)
        currentQuiz.finishedAt = new Date();
        SidekiqJob.create(currentQuiz.uuid, 'uploadHollandQuiz');

        dispatch(setCurrentQuiz(currentQuiz));
        dispatch(resetAnswer());
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
      <HollandQuestionNavHeader step={page} scrollY={scrollY.current}/>
      <Animated.ScrollView contentContainerStyle={{flexGrow: 1, paddingTop: getStyleOfOS(DeviceInfo.hasNotch() ? 152 : 124, 105)}}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY.current } } }],
          { useNativeDriver: true },
        )}
      >
        {renderContent()}
      </Animated.ScrollView>
      <SubmitButton title='បន្តទៀត' />
    </Form>
  )
}
