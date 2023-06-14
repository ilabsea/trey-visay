import React from 'react';
import { View } from 'react-native';
import { Text, RatingGroup } from '../../../components';
import { Card } from 'react-native-paper';
import ratings from '../json/list_ratings';

export default HollandQuestionItem = ({question, index}) => {
  return (
    <Card key={index} style={{marginVertical: 8, padding: 8}} >
      <Text style={{marginHorizontal: 6}}>{index + 1}) {question.name}</Text>
      <View style={{alignItems: 'center'}}>
        <RatingGroup name={question.code} options={ratings}/>
      </View>
    </Card>
  )
}
