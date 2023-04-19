import React, {Component} from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import styles from '../../assets/style_sheets/profile_form';
import PickerSpecific from '../../components/picker/PickerSpecific';
import grades from '../../data/json/grades.json';
import gradeCategories from '../../data/json/grade_categories.json';
import provinces from '../../data/json/address/provinces.json';
import communes from '../../data/json/address/communes.json';
import districts from '../../data/json/address/districts.json';
import highSchools from '../../data/json/address/highSchools.json';

import { Text } from '../../components';
import { useFormikContext } from "formik";
import { Form, SubmitButton } from '../../components/forms';
import * as Yup from "yup";
import { GenderOption, TextInput, DatePicker } from './FormComponent';
import { Formik } from "formik";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("សូមបញ្ចូលឈ្មោះ"),
  sex: Yup.string().required("សូមជ្រើសរើស"),
  dateOfBirth: Yup.string().required("មិនអាចទទេបានទេ"),
  grade: Yup.string().required("មិនអាចទទេបានទេ"),
  gradeCategory: Yup.string().when("grade", {
    is: (grade) => ["11", "12"].includes(grade),
    then: (schema) => schema.required("មិនអាចទទេបានទេ")
  }),
  provinceCode: Yup.string().required("មិនអាចទទេបានទេ"),
  districtCode: Yup.string().required("មិនអាចទទេបានទេ"),
  communeCode: Yup.string().required("មិនអាចទទេបានទេ"),
  highSchoolCode: Yup.string().required("មិនអាចទទេបានទេ"),
});

const FormScreen = ({user}) => {
  const noValue = [{ "code": "", "label": "សូមជ្រើសរើស" }];

  const renderFullName = () => {
    return (
      <View style={styles.formGroup}>
        <TextInput
          name="fullName"
          label="ឈ្មោះពេញ"
          iconName="md-person"
        />
      </View>
    )
  }

  const renderGender = () => {
    return (
      <View style={styles.formGroup}>
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

  const handleSubmit = (values) => {
    console.log('-----values', values);
  }

  const renderPicker = (params) => {
    return (
      <View style={styles.formGroup}>
        <PickerSpecific {...params} />
      </View>
    )
  }

  const initialValue = {
    fullName: user.fullName,
    sex: user.sex,
    dateOfBirth: user.dateOfBirth,
    grade: user.grade,
    gradeCategory: '',
    provinceCode: user.provinceCode,
    districtCode: user.districtCode,
    communeCode: user.communeCode,
    highSchoolCode: user.highSchoolCode
  }

  const filterOption = (items, parendcode) => {
    return items.filter((item) => item.parent_code == parendcode);
  }

  return (
    <Formik
      initialValues={initialValue}
      onSubmit={ handleSubmit }
      validationSchema={validationSchema} >

      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View>
          { renderFullName() }
          { renderGender() }
          { renderDateOfBirth() }
          { renderPicker({label: 'ជាសិស្សថ្នាក់ទី', name: 'grade', options: grades}) }
          { renderPicker({label: 'ជាសិស្សក្នុងបណ្តុំថ្នាក់', name: 'gradeCategory', options: noValue.concat(filterOption(gradeCategories, values.grade)) }) }
          { renderPicker({label: 'ខេត្ត/ក្រុង', name: 'provinceCode', options: noValue.concat(provinces) })}
          { renderPicker({label: 'ស្រុក/ខណ្ឌ', name: 'districtCode', options: noValue.concat(filterOption(districts, values.provinceCode)) })}
          { renderPicker({label: 'ឃុំ/សង្កាត់', name: 'communeCode', options: noValue.concat(filterOption(communes, values.districtCode)) })}
          { renderPicker({label: 'រៀននៅសាលា', name: 'highSchoolCode', options: noValue.concat(filterOption(highSchools, values.districtCode)) })}

          <SubmitButton title="រក្សាទុក"/>
        </View>
      )}

    </Formik>
  )
}

export default FormScreen;
