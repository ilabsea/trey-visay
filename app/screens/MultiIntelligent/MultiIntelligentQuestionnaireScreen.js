import React from 'react'
import { Animated, View } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import { useSelector, useDispatch } from 'react-redux';

import MultiIntelligentNavHeader from '../../components/MultiIntelligent/MultiIntelligentNavHeader';
import QuestionItem from '../../components/MultiIntelligent/QuestionItem';
import { Form, SubmitButton } from '../../components/forms';
import Text from '../../components/Text'
import { getForm, getMultiIntelligentQuestions, getIntelligentScore } from '../../services/question_service';
import {getStyleOfOS} from '../../utils/responsive_util';
import IntelligentQuiz from '../../models/IntelligentQuiz';
import {appendAnswer, resetAnswer} from '../../redux/features/quiz/intelligentSlice';
import {setCurrentQuiz} from '../../redux/features/quiz/intelligentQuizSlice';
import SidekiqJob from '../../models/SidekiqJob';

export default MultiIntelligentQuestionnaireScreen = ({route, navigation}) => {
  const currentIntelligentResponse = useSelector((state) => state.currentIntelligent.value);
  const currentQuiz = useSelector((state) => state.currentIntelligentQuiz.value);
  const dispatch = useDispatch();

  const scrollY = React.useRef(new Animated.Value(0));
  const { questions, isPageEnd, page } = getMultiIntelligentQuestions(route.params?.page);
  const { validationSchema, initialValues } = getForm(questions, currentIntelligentResponse);

  const handleSubmit = (values, {errors}) => {
    dispatch(appendAnswer(values));

    if (isPageEnd) {
      const response = {...currentIntelligentResponse, ...values}
      IntelligentQuiz.write(() => {
        currentQuiz.intelligenceScore = getIntelligentScore(response);
        currentQuiz.intelligenceResponse = response;
        currentQuiz.finishedAt = new Date();
        SidekiqJob.create(currentQuiz.uuid, 'uploadIntelligenceQuiz');

        dispatch(setCurrentQuiz(currentQuiz))
        dispatch(resetAnswer());
      });
      return navigation.navigate('MultiIntelligentResultScreen');
    }
    navigation.push('MultiIntelligentQuestionnaireScreen', {page: page + 1});
  }

  const renderContent = () => {
    return (
      <View style={{marginVertical: 8}}>
        { questions.map((q, index) =>
          <QuestionItem question={q} index={index} page={page} key={index}/>)
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
      <MultiIntelligentNavHeader step={page} scrollY={scrollY.current}/>
      <Animated.ScrollView contentContainerStyle={{flexGrow: 1, paddingTop: getStyleOfOS(DeviceInfo.hasNotch() ? 152 : 124, 105)}}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY.current } } }],
          { useNativeDriver: true },
        )}
      >
        <Text style={{marginLeft: 16, marginTop: 4, marginBottom: -12}}>ចូរជ្រើសរើសរូបតំណាងចំណាប់អារម្មណ៍របស់អ្នក</Text>
        {renderContent()}
      </Animated.ScrollView>
      <SubmitButton title='បន្តទៀត' />
    </Form>
  )
}