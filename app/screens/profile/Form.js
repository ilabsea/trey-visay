import React from 'react';
import {View, TouchableWithoutFeedback, Keyboard} from 'react-native';

import styles from '../../assets/style_sheets/profile_form';
import { SubmitButton } from '../../components/forms';
import FormPickers from './FormComponent/FormPickers';
import * as Yup from "yup";
import { GenderOption, TextInput, DatePicker } from './FormComponent';
import { Formik } from "formik";
import { ScrollableHeader } from '../../components';

const requireGrade = {
  is: (grade) => grade != 'other',
  then: (schema) => schema.required("មិនអាចទទេបានទេ")
}

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("សូមបញ្ចូលឈ្មោះ"),
  sex: Yup.string().required("សូមជ្រើសរើស"),
  dateOfBirth: Yup.string().required("សូមបញ្ចូលថ្ងៃខែឆ្នាំកំណើត"),
  phoneNumber: Yup.string().required("សូមបញ្ចូលលេខទូរស័ព្ទត្រូវដែលត្រឹមត្រូវ").matches(/^0[1-9]{8,9}$/, "សូមបញ្ចូលលេខទូរស័ព្ទត្រូវដែលត្រឹមត្រូវ"),
  grade: Yup.string().required("មិនអាចទទេបានទេ"),
  classGroup: Yup.string().when("grade", {
    is: (grade) => ["11", "12"].includes(grade),
    then: (schema) => schema.required("មិនអាចទទេបានទេ")
  }),
  provinceCode: Yup.string().when("grade", requireGrade),
  districtCode: Yup.string().when("grade", requireGrade),
  highSchoolCode: Yup.string().when("grade", requireGrade)
});

const FormScreen = ({onSubmit}) => {
  const title = 'បំពេញប្រវត្តិរូបសង្ខេប';

  const renderFullName = () => {
    return (
      <View style={styles.formGroup}>
        <TextInput
          name="fullName"
          label="ឈ្មោះពេញ"
          iconName="account"
          required={true}
        />
      </View>
    )
  }

  const renderGender = () => {
    return (
      <View style={[styles.formGroup]}>
        <GenderOption name={"sex"} />
      </View>
    )
  }

  const renderDateOfBirth = () => {
    return(
      <View style={styles.formGroup}>
        <DatePicker name="dateOfBirth" label={"ថ្ងៃ/ខែ/ឆ្នាំកំណើត"} />
      </View>
    )
  }

  const renderPhoneNumber = () => {
    return (
      <View style={styles.formGroup}>
        <TextInput
          name="phoneNumber"
          label="លេខទូរស័ព្ទប្អូន ឬអាណាព្យាបាល"
          iconName="phone"
          inputMode='tel'
          maxLength={10}
          required={true}
        />
      </View>
    )
  }

  const initialValue = {
    fullName: '',
    sex: '',
    dateOfBirth: '',
    phoneNumber: '',
    grade: '',
    classGroup: '',
    provinceCode: '',
    districtCode: '',
    highSchoolCode: ''
  }

  const renderContent = (values) => {
    return (
      <View style={{padding: 16, flexGrow: 1}}>
        { renderFullName() }
        { renderGender() }
        { renderDateOfBirth() }
        { renderPhoneNumber() }
        <FormPickers values={values} />
      </View>
    )
  }

  return (
    <Formik
      initialValues={initialValue}
      onSubmit={ onSubmit }
      validationSchema={validationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={{flex: 1}}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ScrollableHeader
              style={{backgroundColor: '#fff'}}
              renderContent={ () => renderContent(values) }
              title={title}
              largeTitle={title}
            />
          </TouchableWithoutFeedback>
          <SubmitButton title="រក្សាទុក"/>
        </View>
      )}
    </Formik>
  )
}

export default FormScreen;
