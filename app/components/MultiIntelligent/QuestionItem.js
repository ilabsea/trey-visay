import React from 'react';
import { View } from 'react-native';
import { Card } from 'react-native-paper';
import { Text, RatingGroup } from '../../components';
import {ratings} from '../../constants/intelligent_test_constant';

export default QuestionItem = ({question, index, page}) => {
  return (
    <Card key={index} style={{marginVertical: 8, padding: 8, paddingTop: 4}}>
      <Text style={{marginHorizontal: 6}}>{ ((page - 1)  * 7) + index + 1}) {question.name}</Text>
      <View style={{paddingHorizontal: 8}}>
        <RatingGroup name={question.code} options={ratings.sort((a,b) => a.value - b.value)}/>
      </View>
    </Card>
  )
}
