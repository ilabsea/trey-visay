import React from 'react'
import { View, ScrollView, Alert } from 'react-native'
import { Text } from '../../components';
import { Divider } from 'react-native-paper';
import { Form, SubmitButton, SelectOneListItemGroup } from '../../components/forms';
import ConfirmationModal from '../../components/shared/ConfirmationModal'
import CongratulationModal from '../../components/shared/CongratulationModal'
import BoldLabelComponent from '../../components/shared/BoldLabelComponent'
import listMajor from './json/list_major';
import * as Yup from "yup";
import RadioGroup from './components/RadioGroup';
import Quiz from '../../models/Quiz';

const MajorSelectOneScreen = ({route, navigation}) => {
  const [confirmModalVisible, setConfirmModalVisible] = React.useState(false)
  const [selectedMajor, setSelectedMajor] = React.useState(null)
  const [resetAction, setResetAction] = React.useState(null)
  const currentQuiz = route.params.quiz;
  const majors = listMajor.filter(o => Object.values(currentQuiz.majorOptions).includes(o.value))

  const showCongratulation = (major) => {
    Alert.alert(
      'Congratulation!',
      `សូមអបអរសាទរដែលអ្នកបានធ្វើការសម្រេចចិត្តផ្ទាល់ខ្លួនក្នុងការ ជ្រើសរើសយក មុខជំនាញ ”${major}” សម្រាប់ បន្តការសិក្សានាពេលអនាគត!`,
      [
        {
          text: 'ការផុ្តល់អនុសាសន៍',
          onPress: () => {
            navigation.navigate('MajorRecommendationScreen', {quiz: currentQuiz})
          }
        }
      ]
    )
  }

  const updateQuiz = (major) => {
    Quiz.write(()=> {
      currentQuiz.step = 3
      currentQuiz.selectedMajor = major;
    })
  }

  const renderMessage = () => {
    return <Text style={{color: 'black'}}>
              តើអ្នកពិតជាសម្រេចចិត្តជ្រើសរើសមុខជំនាញ “<BoldLabelComponent label={selectedMajor}/>” សម្រាប់បន្តការសិក្សានាពេលអនាគតមែនឬទេ?
           </Text>
  }

  const renderConfirmModal = () => {
    return <ConfirmationModal
              visible={confirmModalVisible}
              message={renderMessage}
              leftButtonLabel='ជ្រើសរើសម្ដងទៀត'
              rightButtonLabel='បាទ/ចាស'
              onLeftPress={() => selectAgain()}
              onRightPress={() => onConfirm()}
          />
  }

  const selectAgain = () => {
    setConfirmModalVisible(false);
    resetAction && resetAction();
  }

  const onConfirm = () => {
    setConfirmModalVisible(false);
    updateQuiz(selectedMajor);
    showCongratulation(selectedMajor);
  }

  const handleSubmit = (values, {errors, resetForm}) => {
    setConfirmModalVisible(true)
    setSelectedMajor(values.major)
    setResetAction(resetForm)
  }

  const validationSchema = Yup.object().shape({
    major: Yup.string().required("សូមជ្រើសរើសជម្រើសខាងលើ!")
  });

  return (
    <Form
      initialValues={{major: ''}}
      onSubmit={ handleSubmit }
      validationSchema={validationSchema}
    >
      <ScrollView style={{padding: 16}}>
        <Text>ដំណាក់កាលនេះ អ្នកអាចចូលទៅអានព័ត៌មាន លម្អិតក្នុងមុខជំនាញនីមួយៗខាងក្រោម។ បន្ទាប់មកអ្នកត្រូវឆ្លុះបញ្ចាំងនិង ធ្វើការសម្រេច ចិត្តជ្រើសរើសចុងក្រោយ ថាតើមុខជំនាញណា មួយដែល ស័ក្តិសម សម្រាប់អ្នកជាងគេ៖</Text>
        <Divider />
        <RadioGroup name={"major"} options={majors} />
      </ScrollView>
      {renderConfirmModal()}
      <SubmitButton title='បន្តទៀត' />
    </Form>
  )
}

export default MajorSelectOneScreen;
