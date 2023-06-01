import React from 'react'
import { View, ScrollView, Alert } from 'react-native'
import { Text } from '../../components';
import { Divider } from 'react-native-paper';
import { Form, SubmitButton, SelectOneListItemGroup } from '../../components/forms';
import ConfirmationModal from '../../components/shared/ConfirmationModal'
import BoldLabelComponent from '../../components/shared/BoldLabelComponent'
import listJob from './json/list_job';
import * as Yup from "yup";
import RadioGroup from '../MajorSelection/components/RadioGroup';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentQuiz } from '../../redux/features/quiz/quizSlice';
import { useNavigation } from '@react-navigation/native';
import Quiz from '../../models/Quiz';
import {FontSetting} from '../../assets/style_sheets/font_setting';

const JobSelectOneScreen = ({route}) => {
  const [confirmModalVisible, setConfirmModalVisible] = React.useState(false)
  const [selectedJob, setSelectedJob] = React.useState(null)
  const [resetAction, setResetAction] = React.useState(null)
  const currentQuiz = route.params.quiz;
  const dispatch = useDispatch();
  const jobs = listJob.filter(o => Object.values(currentQuiz.jobOptions).includes(o.value))
  const navigation = useNavigation();

  const renderMessage = () => {
    return <Text style={{color: 'black'}}>
              តើអ្នកពិតជាសម្រេចចិត្តជ្រើសរើសអាជីពការងារ “<BoldLabelComponent label={selectedJob}/>” សម្រាប់នាពេលអនាគត មែនឬទេ?
           </Text>
  }

  const renderConfirmModal = () => {
    return <ConfirmationModal
              visible={confirmModalVisible}
              message={() => renderMessage()}
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
    updateQuiz(selectedJob);
    showCongratulation(selectedJob);
  }

  const showCongratulation = (job) => {
    Alert.alert(
      'Congratulation!',
      `សូមអបអរសាទរដែលអ្នកបានធ្វើការសម្រេចចិត្តផ្ទាល់ខ្លួនក្នុងការ ជ្រើសរើសយក មុខជំនាញ ”${job}” សម្រាប់ បន្តការសិក្សានាពេលអនាគត!`,
      [
        {
          text: 'ការផុ្តល់អនុសាសន៍',
          onPress: () => {
            navigation.navigate('JobRecommendationScreen', {quiz: currentQuiz})
          }
        }
      ]
    )
  }

  const updateQuiz = (job) => {
    Quiz.write(()=> {
      currentQuiz.step = 4
      currentQuiz.selectedJob = job;
      dispatch(setCurrentQuiz(currentQuiz));
    })
  }

  const handleSubmit = (values, {errors, resetForm}) => {
    setConfirmModalVisible(true)
    setSelectedJob(values.job)
    setResetAction(resetForm)
  }

  const validationSchema = Yup.object().shape({
    job: Yup.string().required("សូមជ្រើសរើសជម្រើសខាងលើ!")
  });

  return (
    <Form
      initialValues={{job: ''}}
      onSubmit={ handleSubmit }
      validationSchema={validationSchema}
    >
      <ScrollView style={{padding: 16}}>
        <Text>ដំណាក់កាលនេះ អ្នកអាចចូលទៅអានព័ត៌មាន លម្អិតក្នុងមុខជំនាញនីមួយៗខាងក្រោម។ បន្ទាប់មកអ្នកត្រូវឆ្លុះបញ្ចាំងនិង ធ្វើការសម្រេច ចិត្តជ្រើសរើសចុងក្រោយ ថាតើមុខជំនាញណា មួយដែល ស័ក្តិសម សម្រាប់អ្នកជាងគេ៖</Text>
        <Divider />
        <RadioGroup name={"job"} options={jobs} />
      </ScrollView>
      {renderConfirmModal()}
      <SubmitButton title='បន្តទៀត' />
    </Form>
  )
}

export default JobSelectOneScreen;
