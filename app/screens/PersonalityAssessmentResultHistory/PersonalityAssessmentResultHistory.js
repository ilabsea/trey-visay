import React, { Component } from 'react';
import {
  View,
  ScrollView,
} from 'react-native';

import realm from '../../db/schema';
import Result from '../PersonalityAssessmentResult/Result';
import Text from '../../components/Text';

const PersonalityAssessmentHistory = ({route}) => {
  const _renderContent = () => {
    let assessment = realm.objects('PersonalityAssessment').filtered('uuid=="' + route.params.assessmentUuid + '"')[0];

    return (
      <View>
        <Text style={{padding: 20, paddingBottom: 0}}>បុគ្គលិកលក្ខណៈរបស់អ្នក អាចជួយអ្នកក្នុងការជ្រើសរើសមុខជំនាញសិក្សា ឬអាជីពការងារមានភាពប្រសើរជាមូលដ្ឋាននាំអ្នកឆ្ពោះទៅមាគ៌ាជីវិតជោគជ័យនាថ្ងៃអនាគត។</Text>

        <Result assessment={assessment}/>
      </View>
    )
  }

  return (
    <ScrollView>
      { _renderContent() }
    </ScrollView>
  )
}

export default PersonalityAssessmentHistory;
