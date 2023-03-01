import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Button
} from 'react-native';

import Question from '../../../data/json/personal_understanding.json';
import RadioGroup from '../../../components/PersonalUnderstanding/RadioGroup';
import { RadioButton, Text, Card } from 'react-native-paper';

import submit from './submit'

import { useSelector, useDispatch } from 'react-redux'
import { setQuizOneAnswer, resetQuizOne } from '../../../redux/features/careerAssessment/quizOneSlice';

import Question3 from '../../../components/PersonalUnderstanding/Question3';
import Question4 from '../../../components/PersonalUnderstanding/Question4';
import TextInput from '../../../components/PersonalUnderstanding/TextInput';

const Form = (props) => {
  const dispatch = useDispatch();
  const quizOneAnswer = useSelector((state) => state.quizOneAnswer.value);

  const setAnswerState = (key, value) => {
    let params = {};
    params[key] = value;

    dispatch(setQuizOneAnswer(params));
  }

  const question = (questionKey) => {
    return (
      <Card style={{marginBottom: 16}}>
        <Card.Content>
          <RadioGroup
            value={quizOneAnswer[questionKey]}
            onValueChange={(value) => setAnswerState(questionKey, value)}
            questionKey={questionKey} />
        </Card.Content>
      </Card>
    )
  }

  const question1 = () => (question('areYouGoingToStudyTillGrade12'))
  const question2 = () => (question('areYourParentsAllowYouToStudyTillGrade12'))

  const question5 = () => (
    <Card style={{marginBottom: 16}}>
      <Card.Content>
        <TextInput
          label={ Question['howToReachJobVacancy'] }
          value={ quizOneAnswer['howToReachJobVacancy'] || '' }
          onChangeText={ (text) => setAnswerState('howToReachJobVacancy', text) }
        />
      </Card.Content>
    </Card>
  )


  return (
    <View style={styles.scrollContainer}>
      <Text style={{marginBottom: 8}}>ចូរបំពេញចម្លើយខាងក្រោម៖</Text>

      { false &&
        <Button title="test" onPress={() => {
          dispatch(resetQuizOne());
        }}/>
      }

      { question1() }
      { question2() }

      <Question3 />
      <Question4 />

      { question5() }


    </View>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    margin: 16,
    marginBottom: 4
  },
})

export default Form;
