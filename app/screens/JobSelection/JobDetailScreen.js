import React, {useEffect} from 'react'
import { View, ScrollView } from 'react-native'

import { Text } from '../../components';
import CustomNavigationHeader from '../../components/shared/CustomNavigationHeader'
import BoldLabelComponent from '../../components/shared/BoldLabelComponent'
import JobDetailAccordion from '../../components/jobDetails/JobDetailAccordion'
import {screenHorizontalPadding} from '../../constants/component_constant'
import Job from '../../models/Job';
import visitService from '../../services/visit_service';

const JobDetailScreen = ({route}) => {
  const job = Job.findByCode(route.params.job_code) || {}

  useEffect(() => {
    visitService.recordVisitDetailScreen('job', job.id)
  }, []);

  return (
    <View style={{flex: 1}}>
    <CustomNavigationHeader title={job.name} headerStyle={{zIndex: 1}} />

      <ScrollView>
        <Text style={{marginTop: 16, marginBottom: 8, paddingHorizontal: screenHorizontalPadding, color: '#000'}}>
          ស្វែងយល់អំពីការសិក្សាមុខរបរ <BoldLabelComponent label={route.params.title} />៖
        </Text>
        <JobDetailAccordion job={job} showRecommendation={true} />
      </ScrollView>
    </View>
  )
}

export default JobDetailScreen
