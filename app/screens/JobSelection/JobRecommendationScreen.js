import React from 'react'
import { View, ScrollView, Alert } from 'react-native'
import { Text, FooterBar } from '../../components';
import { Card } from 'react-native-paper';
import { StackActions } from '@react-navigation/native';
import BoldLabelComponent from '../../components/shared/BoldLabelComponent';
import { reset } from '../../hooks/RootNavigation';
import Quiz from '../../models/Quiz';

const JobRecommendationScreen = ({route, navigation}) => {
  const currentQuiz = Quiz.findByUuid(route.params.quizUuid);
  const job = currentQuiz.selectedJob;

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <Text style={{textAlign: 'center', marginVertical: 16}}>ការផ្តល់អនុសាសន៍</Text>

        <Card style={{padding: 16}}>
          <Text>
            ដើម្បីអាចបន្តការសិក្សាលើមុខជំនាញ.."<BoldLabelComponent label={job.name}/>".. នៅកម្រិតឧត្តមសិក្សាទទួល បានជោគជ័យ ប្អូនត្រូវពិនិត្យលើចំណុចមួយ ចំនួនដូច ខាងក្រោម៖
            {job.recommendation}
          </Text>
        </Card>

      </ScrollView>

      <FooterBar icon='keyboard-arrow-right' text='រួចរាល់' onPress={() => reset({routeName: 'HollandNavigator'})} />
    </View>
  )
}

export default JobRecommendationScreen
