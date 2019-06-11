import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';

import realm from '../../db/schema';
import Result from '../PersonalityAssessmentResult/Result';

export default class PersonalityAssessmentHistory extends Component {
  _renderContent = () => {
    let assessment = realm.objects('PersonalityAssessment').filtered('uuid=="' + this.props.navigation.getParam('assessmentUuid') + '"')[0];

    return (
      <View>
        <Text style={{padding: 20, paddingBottom: 0}}>បុគ្គលិកលក្ខណៈរបស់អ្នក អាចជួយអ្នកក្នុងការជ្រើសរើសមុខជំនាញសិក្សា ឬអាជីពការងារមានភាពប្រសើរជាមូលដ្ឋាននាំអ្នកឆ្ពោះទៅមាគ៌ាជីវិតជោគជ័យនាថ្ងៃអនាគត។</Text>

        <Result
          assessment={assessment}
          navigation={this.props.navigation}
        />
      </View>
    )
  }

  render () {
    return (
      <ScrollView>
        { this._renderContent() }
      </ScrollView>
    )
  }
}
