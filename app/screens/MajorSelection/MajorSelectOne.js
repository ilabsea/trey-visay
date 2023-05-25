import React from 'react'
import { View, ScrollView } from 'react-native'
import { Text } from '../../components';
import { Divider } from 'react-native-paper';
import { Form, SubmitButton, SelectOneListItemGroup } from '../../components/forms';
import listMajor from './json/list_major';
import * as Yup from "yup";

const MajorSelectOne = () => {
  const majors = listMajor.slice(0, 3);

  const handleSubmit = () => {
    console.log("----------------------submit multiple")
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

        <SelectOneListItemGroup
          options={majors}
          name={"major"}
        />
      </ScrollView>

      <SubmitButton title='បន្តទៀត' />
    </Form>
  )
}

export default MajorSelectOne
