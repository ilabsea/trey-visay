import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Button
} from 'react-native';

import { Card } from 'react-native-paper';
import { QuestionField }  from '../../components/forms';
import { Text } from '../../components';
import questions from './json/list_questions';

const QuestionForm = (props) => {
  const renderQuestion = (question) => {
    return (
      <View>
        <QuestionField question={question}/>

        { question.sub_questions.map((sub_question) => (
            <View style={{marginTop: 16}}>
              <QuestionField question={sub_question} />
            </View>
          ))
        }
      </View>
    )
  }

  const renderQuestionCard = (question, index) => {
    return (
      <Card style={{marginBottom: 16}} key={index}>
        <Card.Content>
          { renderQuestion(question)}
        </Card.Content>
      </Card>
    )
  }

  const renderForm = () => {
    return (
      <View>
        { questions.map((question, index) => renderQuestionCard(question, index)) }
      </View>
    )
  }

  return (
    <View style={styles.scrollContainer}>
      <Text style={{marginBottom: 8}}>ចូរបំពេញចម្លើយខាងក្រោម៖</Text>

      { renderForm() }
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
