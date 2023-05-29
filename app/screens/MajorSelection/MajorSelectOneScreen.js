import React from 'react'
import { View, ScrollView, Alert } from 'react-native'
import { Text } from '../../components';
import { Divider } from 'react-native-paper';
import { Form, SubmitButton, SelectOneListItemGroup } from '../../components/forms';
import listMajor from './json/list_major';
import * as Yup from "yup";
import RadioGroup from './components/RadioGroup';
import Quiz from '../../models/Quiz';

const MajorSelectOneScreen = ({route, navigation}) => {
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

  const handleAlert = (major, resetForm) => {
    Alert.alert('', `តើអ្នកពិតជាសម្រេចចិត្តជ្រើសរើសមុខ ជំនាញ ”${major}” សម្រាប់បន្តការ សិក្សានាពេលអនាគត មែនឬទេ?`,
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
            updateQuiz(major);
            showCongratulation(major);
          },
        }
      ],
    )
  }

  const handleSubmit = (values, {errors, resetForm}) => {
    handleAlert(values.major, resetForm);
  }

  const validationSchema = Yup.object().shape({
    major: Yup.string().required("សូមជ្រើសរើសជម្រើសខាងលើ!")
  });

  return (
    <Form
      initialValues={{major: ''}}
      onSubmit={ handleSubmit }
      validationSchema={validationSchema}>

      <ScrollView style={{padding: 16}}>
        <Text>ដំណាក់កាលនេះ អ្នកអាចចូលទៅអានព័ត៌មាន លម្អិតក្នុងមុខជំនាញនីមួយៗខាងក្រោម។ បន្ទាប់មកអ្នកត្រូវឆ្លុះបញ្ចាំងនិង ធ្វើការសម្រេច ចិត្តជ្រើសរើសចុងក្រោយ ថាតើមុខជំនាញណា មួយដែល ស័ក្តិសម សម្រាប់អ្នកជាងគេ៖</Text>

        <Divider />

        <RadioGroup name={"major"} options={majors} />
      </ScrollView>

      <SubmitButton title='បន្តទៀត' />
    </Form>
  )
}

export default MajorSelectOneScreen;
