import React, { useState, useEffect } from 'react';
import { View, StyleSheet} from 'react-native';

import Question from '../../data/json/personal_understanding.json';

import RadioGroup from './RadioGroup';
import { Card } from 'react-native-paper';

import { useSelector, useDispatch } from 'react-redux'
import { setQuizOneAnswer, resetQuizOne } from '../../redux/features/careerAssessment/quizOneSlice';
import TextInput from './TextInput';

const Question3 = (props) => {
  const dispatch = useDispatch();
  const quizOneAnswer = useSelector((state) => state.quizOneAnswer.value);
  const questionKey = "haveYouEverThoughtOfCareer"

  const isDisabledOther = () => {
    return quizOneAnswer[questionKey] != "Yes"
  }

  const getTextColor = isDisabledOther() ? [styles.labelGroup, {color: '#ccc'}] : styles.labelGroup;

  const subQuestAsTextInput = (questKey) => {
    return (
      <TextInput
        label={ Question[questKey] }
        value={ quizOneAnswer[questKey] || '' }
        disabled={ isDisabledOther() }
        onChangeText={ (text) => onValueChange(questKey, text) }
      />
    )
  }

  const onValueChange = (questKey, value) => {
    let params = {};
    params[questKey] = value;

    dispatch(setQuizOneAnswer(params));
  }

  return (
    <Card style={styles.formGroup}>
      <Card.Content>
        <RadioGroup
          value={quizOneAnswer[questionKey]}
          questionKey={questionKey}
          onValueChange={(value) => onValueChange(questionKey, value)}/>

        { subQuestAsTextInput('careerName') }
        { subQuestAsTextInput('howToReachCareerGoal') }

        <RadioGroup
          value={quizOneAnswer.doesParentsAgreeWith}
          questionKey={'doesParentsAgreeWith'}
          disabled={isDisabledOther()}
          onValueChange={(value) => onValueChange('doesParentsAgreeWith', value)}/>
      </Card.Content>
    </Card>
  )
}

const styles = StyleSheet.create({
  formGroup: {
    marginBottom: 16,
  },
  labelGroup: {
    marginBottom: 10,
  },
  formSubGroup3: {
    marginBottom: 24,
    paddingVertical: 10,
  }
})

export default Question3;
