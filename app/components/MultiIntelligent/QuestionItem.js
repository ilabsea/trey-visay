import React from 'react';
import { View } from 'react-native';
import { Text, RatingGroup } from '../../components';
import { Card } from 'react-native-paper';

const ratings = [
  {
    "name": "មិនឯកភាពទាំងស្រុង",
    "icon": "very_dislike",
    "value": 1
  },
  {
    "name": "មិនឯកភាព",
    "icon": "dislike",
    "value": 2
  },
  {
    "name": "ឯកភាព",
    "icon": "like",
    "value": 3
  },
  {
    "name": "ឯកភាពទាំងស្រុង",
    "icon": "very_like",
    "value": 4
  }
]

export default QuestionItem = ({question, index}) => {
  return (
    <Card key={index} style={{marginVertical: 8, padding: 8, paddingTop: 4}}>
      <Text style={{marginHorizontal: 6}}>{index + 1}) {question.name}</Text>
      <View style={{paddingHorizontal: 8}}>
        <RatingGroup name={question.code} options={ratings}/>
      </View>
    </Card>
  )
}
