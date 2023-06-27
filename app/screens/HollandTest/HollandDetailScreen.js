import React from 'react';
import { View } from 'react-native';

import { List } from 'react-native-paper';
import { Text, ScrollableHeader } from '../../components';
import HollandTestResultBarChart from '../../components/HollandTestResult/HollandTestResultBarChart';
import HollandTestResultCharacteristicAccordions from '../../components/HollandTestResult/HollandTestResultCharacteristicAccordions';
import {screenHorizontalPadding} from '../../constants/component_constant';
import {getStyleOfOS, getStyleOfDevice} from '../../utils/responsive_util';
import Quiz from '../../models/Quiz';
import Color from '../../themes/color';
import { useNavigation } from '@react-navigation/native';

const ListItem = ({caption, item={}}) => {
  const navigation = useNavigation();
  let title = !!item.title ? item.title : () => (<Text>ឈ្វេងយល់បន្ថែម <Text style={{color: Color.red}}>(មិនទាន់បានកំណត់)</Text></Text>);

  return (
    <View>
      <View style={{paddingTop: 10, paddingHorizontal: screenHorizontalPadding}}>
        <Text>{caption}</Text>
      </View>

      <List.Item
        onPress={() => navigation.navigate(item.route, {...item.routeParam}) }
        title={title}
        style={[{ backgroundColor: Color.whiteColor, borderBottomWidth: 1, borderColor: Color.paleGray , paddingHorizontal: getStyleOfDevice(14, 6)}]}
        right={props => <List.Icon {...props} icon="chevron-right" />}
      />
    </View>
  )
}

const HollandTestResult = ({route, navigation}) => {
  const currentQuiz = Quiz.findByUuid(route.params.quizUuid);
  const title = route.params.title;

  const renderContent = () => {
    return (
      <View style={{marginBottom: 10}}>
        <View style={{paddingTop: 10, paddingHorizontal: screenHorizontalPadding}}>
          <Text style={{color: 'black', lineHeight: getStyleOfOS(30, 34)}}>ខាងក្រោមនេះ ជាលទ្ធផលតេស្ដរបស់អ្នក! សូមអ្នកឈ្វេងយល់ពីការពណ៌នាលម្អិតអំពីបុគ្គលិកលក្ខណៈរបស់អ្នកដូចខាងក្រោម </Text>
          <HollandTestResultBarChart quiz={currentQuiz}/>
        </View>

        <HollandTestResultCharacteristicAccordions quiz={currentQuiz}/>
        <ListItem caption={"ជំនាញកម្រិតឧត្តមសិក្សារបស់អ្នក"} item={{title: !!currentQuiz.selectedMajor && currentQuiz.selectedMajor.name, route: currentQuiz.majorRoute, routeParam: {quizUuid: currentQuiz.uuid, major_code: currentQuiz.majorCodeSelected}}}/>
        <ListItem caption={"មុខរបរ ឬអាជីពសាកសមរបស់អ្នក"} item={{title: !!currentQuiz.selectedJob && currentQuiz.selectedJob.name, route: currentQuiz.jobRoute, routeParam: {quizUuid: currentQuiz.uuid, job_code: currentQuiz.jobCodeSelected}}}/>
      </View>
    )
  }

  return (
    <View style={{flex: 1}}>
      <ScrollableHeader
        renderContent={ renderContent }
        title={title}
        largeTitle={title}
        onPressBack={() => navigation.popToTop()}
      />
    </View>
  )
}

export default HollandTestResult;
