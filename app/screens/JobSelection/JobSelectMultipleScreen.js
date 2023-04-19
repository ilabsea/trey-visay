import React from 'react'
import { View, ScrollView } from 'react-native'
import { Text } from '../../components';
import { Card, Divider } from 'react-native-paper';
import { Form, SubmitButton } from '../../components/forms';
import listJobs from './json/list_job';
import Quiz from '../../models/Quiz';
import * as Yup from "yup";
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentQuiz } from '../../redux/features/quiz/quizSlice';
import CheckboxGroup from '../MajorSelection/components/CheckboxGroup';
import SearchableHeader from '../../components/shared/searchableHeaders/SearchableHeader'

const JobSelectMultipleScreen = ({route, navigation}) => {
  // const currentQuiz = useSelector((state) => state.currentQuiz.value);
  const [textSearch, setTextSearch] = React.useState('');
  const currentQuiz = route.params.quiz;
  const dispatch = useDispatch();

  const handleSubmit = (values, {errors}) => {
    Quiz.write(()=> {
      currentQuiz.jobOptions = values.jobs;

      dispatch(setCurrentQuiz(currentQuiz));
    })

    navigation.navigate('JobSelectOneScreen', {quiz: currentQuiz});
  }

  const validationSchema = Yup.object().shape({
    jobs: Yup.array().min(1, "សូមជ្រើសរើសយ៉ាងតិច 1").max(3, "សូមជ្រើសរើសយ៉ាងច្រើន 3")
  });

  return (
    <React.Fragment>
      <SearchableHeader title="ជម្រើសអាជីពការងារ" placeholder="ស្វែងរកអាជីពការងារ"
        searchedText={textSearch} setSearchedText={(text) => setTextSearch(text)}
      />
      <Form
        initialValues={{jobs: []}}
        onSubmit={ handleSubmit }
        validationSchema={validationSchema}
      >
        <ScrollView style={{padding: 16}}>
          <Card style={{padding: 16}}>
            <Text>ចូរជ្រើសរើសអាជីពការងារដែលអ្នកពេញចិត្តក្នុងការបន្តការសិក្សានាពេលអនាគត យ៉ាងច្រើនបំផុត៣មុខជំនាញ៖</Text>
            <Divider />
            <CheckboxGroup name={"jobs"} options={listJobs.filter(job => job.name.includes(textSearch))} />
          </Card>
        </ScrollView>
        <SubmitButton title='បន្តទៀត' />
      </Form>
    </React.Fragment>
  )
}

export default JobSelectMultipleScreen