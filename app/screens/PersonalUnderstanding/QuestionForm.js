import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Card } from 'react-native-paper';
import { QuestionField }  from '../../components/forms';
import { Text } from '../../components';
import questions from './json/list_questions';
import Color from '../../themes/color';

const QuestionForm = (props) => {
  const renderQuestion = (question, index) => {
    return (
      <View key={`question_${index}`}>
        <QuestionField question={question}/>
      </View>
    )
  }

  const cardStyle = (isRelevant) => {
    if (!isRelevant) return  {marginTop: 16}

    return {borderTopLeftRadius: 0, borderTopRightRadius: 0, marginTop: -5}
  }

  const renderQuestionCard = (question, index) => {
    return (
      <Card style={cardStyle(question.relevant)} key={index}>
        <Card.Content>
          { renderQuestion(question)}
        </Card.Content>
      </Card>
    )
  }

  return (
    <View style={styles.scrollContainer}>
      <Text style={{marginBottom: -8}}>ចូរបំពេញចម្លើយខាងក្រោម៖</Text>
      <View>{ questions.map((question, index) => renderQuestionCard(question, index)) }</View>
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

export default QuestionForm;
