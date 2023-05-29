import React from 'react'
import { View, ScrollView, Alert } from 'react-native'
import { Text } from '../../components';
import { Divider } from 'react-native-paper';
import { Form, SubmitButton, SelectOneListItemGroup } from '../../components/forms';
import listJob from './json/list_job';
import * as Yup from "yup";
import RadioGroup from '../MajorSelection/components/RadioGroup';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentQuiz } from '../../redux/features/quiz/quizSlice';
import { useNavigation } from '@react-navigation/native';
import Quiz from '../../models/Quiz';

const JobSelectOneScreen = ({route}) => {
  const currentQuiz = route.params.quiz;
  const dispatch = useDispatch();
  const jobs = listJob.filter(o => Object.values(currentQuiz.jobOptions).includes(o.value))
  const navigation = useNavigation();

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

  const handleAlert = (job, resetForm) => {
    Alert.alert('', `តើអ្នកពិតជាសម្រេចចិត្តជ្រើសរើសអាជីពការងារ “${job}” សម្រាប់នាពេលអនាគត មែនឬទេ?`,
      [
        {
          text: 'ជ្រើសរើសម្តងទៀត',
          onPress: () => {
            resetForm();
          },
        },
        {
          text: 'បាទ/ចាស',
          onPress: () => {
            updateQuiz(job);
            showCongratulation(job);
          },
        }
      ],
    )
  }

  const handleSubmit = (values, {errors, resetForm}) => {
    handleAlert(values.job, resetForm);
  }

  const validationSchema = Yup.object().shape({
    job: Yup.string().required("សូមជ្រើសរើសជម្រើសខាងលើ!")
  });

  return (
    <Form
      initialValues={{job: ''}}
      onSubmit={ handleSubmit }
      validationSchema={validationSchema}>

      <ScrollView style={{padding: 16}}>
        <Text>ដំណាក់កាលនេះ អ្នកអាចចូលទៅអានព័ត៌មាន លម្អិតក្នុងមុខជំនាញនីមួយៗខាងក្រោម។ បន្ទាប់មកអ្នកត្រូវឆ្លុះបញ្ចាំងនិង ធ្វើការសម្រេច ចិត្តជ្រើសរើសចុងក្រោយ ថាតើមុខជំនាញណា មួយដែល ស័ក្តិសម សម្រាប់អ្នកជាងគេ៖</Text>

        <Divider />

        <RadioGroup name={"job"} options={jobs} />
      </ScrollView>

      <SubmitButton title='បន្តទៀត' />
    </Form>
  )
}

export default JobSelectOneScreen;
