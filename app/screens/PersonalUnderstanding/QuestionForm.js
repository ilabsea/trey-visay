import React from 'react';
import { View, StyleSheet } from 'react-native';

import { QuestionField }  from '../../components/forms';
import { Text } from '../../components';
import questions from './json/list_questions';

const QuestionForm = (props) => {
  const renderQuestion = (question, index) => {
    return <QuestionField key={`question_${index}`} question={question} questions={questions}/>
  }

  return (
    <View style={styles.scrollContainer}>
      <Text style={{marginBottom: -8}}>ចូរបំពេញចម្លើយខាងក្រោម៖</Text>
      <View>{ questions.map((question, index) => renderQuestion(question, index)) }</View>
    </View>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    margin: 16,
    marginBottom: 16
  },
})

export default QuestionForm;
