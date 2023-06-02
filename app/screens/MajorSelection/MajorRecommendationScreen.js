import React from 'react'
import { View, ScrollView, Alert } from 'react-native'
import { Text, FooterBar } from '../../components';
import { Card } from 'react-native-paper';
import { StackActions } from '@react-navigation/native';
import BoldLabelComponent from '../../components/shared/BoldLabelComponent';
import ConfirmationModal from '../../components/shared/ConfirmationModal';

const MajorRecommendationScreen = ({route, navigation}) => {
  const [modalVisible, setModalVisible] = React.useState(false)
  const currentQuiz = route.params.quiz;

  const renderModal = () => {
    return <ConfirmationModal visible={modalVisible} message={() => <Text>តើអ្នកចង់បន្តឈ្វេងយល់ពីជម្រើសអាជីពការងារស័ក្តិសមសម្រាប់អ្នកទៀតដែរឬទេ?</Text>}
              leftButtonLabel='បញ្ចប់ត្រឹមនេះ'
              rightButtonLabel='បាទ/ចាស បន្ត'
              onLeftPress={() => {
                setModalVisible(false)
                navigation.dispatch(StackActions.replace('HollandNavigator'))
              }}
              onRightPress={() => {
                setModalVisible(false)
                navigation.navigate('JobSelectMultipleScreen', {quiz: currentQuiz})
              }}
           />
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <Text style={{textAlign: 'center', marginVertical: 16}}>ការផ្តល់អនុសាសន៍</Text>

        <Card style={{padding: 16}}>
          <Text>
            ដើម្បីអាចបន្តការសិក្សាលើមុខជំនាញ.."<BoldLabelComponent label={currentQuiz.selectedMajor}/>".. នៅកម្រិតឧត្តមសិក្សាទទួល បានជោគជ័យ ប្អូនត្រូវពិនិត្យលើចំណុចមួយ ចំនួនដូច ខាងក្រោម៖
            ការពង្រឹងមុខវិជ្ជាតម្រង់ទិសនៅមធ្យមសិក្សាទុតិយភូមិ៖
            ការជ្រើសរើសគ្រឹះស្ថានសិក្សា
            វិធីនៃការរៀននិងបង្រៀន
            ….
          </Text>
        </Card>

      </ScrollView>
      {renderModal()}
      <FooterBar icon='keyboard-arrow-right' text='រួចរាល់' onPress={() => setModalVisible(true)} />
    </View>
  )
}

export default MajorRecommendationScreen
