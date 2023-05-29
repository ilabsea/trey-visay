import React from 'react'
import { View, ScrollView, Alert } from 'react-native'
import { Text, FooterBar } from '../../components';
import { Card } from 'react-native-paper';
import { StackActions } from '@react-navigation/native';

const MajorRecommendationScreen = ({route, navigation}) => {
  const currentQuiz = route.params.quiz;

  const handleAlert = () => {
    Alert.alert(
      '',
      'តើអ្នកចង់បន្តឈ្វេងយល់ពីជម្រើសអាជីពការងារស័ក្តិសមសម្រាប់អ្នក ទៀតដែរឬទេ?',
      [
        {
          text: 'បញ្ចប់ត្រឹមនេះ',
          onPress: () => {
            navigation.dispatch(StackActions.replace('HollandNavigator'));
          },
        },
        {
          text: 'បាទ/ចាស  បន្ត',
          onPress: () => {
            navigation.navigate('JobSelectMultipleScreen', {quiz: currentQuiz});
          },
        }
      ],
    )
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <Text style={{textAlign: 'center', marginVertical: 16}}>ការផ្តល់អនុសាសន៍</Text>

        <Card style={{padding: 16}}>
          <Text>
            ដើម្បីអាចបន្តការសិក្សាលើមុខជំនាញ.."{currentQuiz.selectedMajor}".. នៅកម្រិតឧត្តមសិក្សាទទួល បានជោគជ័យ ប្អូនត្រូវពិនិត្យលើចំណុចមួយ ចំនួនដូច ខាងក្រោម៖
            ការពង្រឹងមុខវិជ្ជាតម្រង់ទិសនៅមធ្យមសិក្សាទុតិយភូមិ៖
            ការជ្រើសរើសគ្រឹះស្ថានសិក្សា
            វិធីនៃការរៀននិងបង្រៀន
            ….
          </Text>
        </Card>

      </ScrollView>

      <FooterBar icon='keyboard-arrow-right' text='រួចរាល់' onPress={() => handleAlert()} />
    </View>
  )
}

export default MajorRecommendationScreen
