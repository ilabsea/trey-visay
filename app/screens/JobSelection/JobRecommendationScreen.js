import React, {useEffect} from 'react'
import { View, ScrollView, BackHandler } from 'react-native'
import { Text, FooterBar } from '../../components';
import { Card } from 'react-native-paper';
import { StackActions } from '@react-navigation/native';
import BoldLabelComponent from '../../components/shared/BoldLabelComponent';
import CustomNavigationHeader from '../../components/shared/CustomNavigationHeader';
import { reset } from '../../hooks/RootNavigation';
import Quiz from '../../models/Quiz';
import {screenHorizontalPadding} from '../../constants/component_constant';
import { FontSetting } from '../../assets/style_sheets/font_setting';

const JobRecommendationScreen = ({route, navigation}) => {
  const currentQuiz = Quiz.findByUuid(route.params.quizUuid);
  const job = currentQuiz.selectedJob;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.dispatch(StackActions.replace('HollandNavigator'))
      return true;
    })
    return () => !!backHandler && backHandler.remove()
  }, [])

  return (
    <View style={{flex: 1}}>
      <CustomNavigationHeader title='ជម្រើសអាជីពការងារ' headerStyle={{zIndex: 1}} onPressBack={() => navigation.dispatch(StackActions.replace('HollandNavigator'))} />
      <ScrollView>
        <Text style={{marginLeft: screenHorizontalPadding, fontSize: FontSetting.title, marginBottom: 6, marginTop: 16}}>ការផ្តល់អនុសាសន៍</Text>

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
