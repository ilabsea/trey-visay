import React from 'react'
import { ScrollView } from 'react-native'
import { Text } from '../../components';
import { Divider } from 'react-native-paper';
import { Form, SubmitButton, SelectOneListItemGroup } from '../../components/forms';
import ConfirmationModal from '../../components/shared/ConfirmationModal'
import CongratulationModal from '../../components/shared/CongratulationModal'
import BoldLabelComponent from '../../components/shared/BoldLabelComponent'
import * as Yup from "yup";
import RadioGroup from '../MajorSelection/components/RadioGroup';
import { useDispatch } from 'react-redux';
import { setCurrentQuiz } from '../../redux/features/quiz/quizSlice';
import { useNavigation } from '@react-navigation/native';
import Quiz from '../../models/Quiz';
import SidekiqJob from '../../models/SidekiqJob';
import Job from '../../models/Job';

const JobSelectOneScreen = ({route}) => {
  const [confirmModalVisible, setConfirmModalVisible] = React.useState(false)
  const [congratsModalVisible, setCongratsModalVisible] = React.useState(false)
  const [selectedJob, setSelectedJob] = React.useState(null)
  const [resetAction, setResetAction] = React.useState(null)
  const currentQuiz = route.params.quiz;
  const dispatch = useDispatch();
  const jobs = Job.findAllByCodes(Object.values(currentQuiz.jobCodeSelections)).map(job => ({name: job.name_km, value: job.code}))
  const navigation = useNavigation();

  const modalMessage = (prefixLabel, suffixLabel) => {
    let job = Job.findByCode(selectedJob) || {};
    return <Text>{prefixLabel} “<BoldLabelComponent label={job.name_km}/>” {suffixLabel}</Text>
  }

  const renderPopupModals = () => {
    return (
      <React.Fragment>
        <ConfirmationModal
          visible={confirmModalVisible}
          message={() => modalMessage('តើអ្នកពិតជាសម្រេចចិត្តជ្រើសរើសអាជីពការងារ', 'សម្រាប់នាពេលអនាគតមែនឬទេ?')}
          leftButtonLabel='ជ្រើសរើសម្ដងទៀត'
          rightButtonLabel='បាទ/ចាស'
          onLeftPress={() => selectAgain()}
          onRightPress={() => onConfirm()}
        />
        <CongratulationModal
          visible={congratsModalVisible}
          message={() => modalMessage('សូមអបអរសាទរដែលអ្នកបានធ្វើការសម្រេចចិត្តផ្ទាល់ខ្លួនក្នុងការជ្រើសរើសយកអាជីពការងារ', 'សម្រាប់បន្តការសិក្សានាពេលអនាគត!')}
          onPressButton={() => {
            setCongratsModalVisible(false)
            navigation.navigate('JobRecommendationScreen', {quiz: currentQuiz})
          }}
        />
      </React.Fragment>
    )
  }

  const selectAgain = () => {
    setConfirmModalVisible(false);
    resetAction && resetAction();
  }

  const onConfirm = () => {
    setConfirmModalVisible(false);
    updateQuiz(selectedJob);
    setCongratsModalVisible(true);
  }

  const updateQuiz = (job) => {
    Quiz.write(()=> {
      currentQuiz.step = 3
      currentQuiz.jobCodeSelected = job;
      dispatch(setCurrentQuiz(currentQuiz));

      SidekiqJob.create(currentQuiz.uuid, 'uploadJobResponse');
    })
  }

  const handleSubmit = (values, {errors, resetForm}) => {
    setConfirmModalVisible(true)
    setSelectedJob(values.job)
    setResetAction(() => resetForm)
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
      {renderPopupModals()}
      <SubmitButton title='បន្តទៀត' />
    </Form>
  )
}

export default JobSelectOneScreen;
