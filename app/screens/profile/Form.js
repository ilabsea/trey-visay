import React, {Component} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';

import styles from '../../assets/style_sheets/profile_form';
import PickerSpecific from '../../components/picker/PickerSpecific';
import CustomBottomSheetPicker from '../../components/shared/CustomBottomSheetPicker';

import grades from '../../data/json/grades.json';
import classGroups from '../../data/json/class_groups.json';
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
import { FooterBar, BackButton, ScrollableHeader } from '../../components';

const requireGrade = {
  is: (grade) => grade != 'other',
  then: (schema) => schema.required("មិនអាចទទេបានទេ")
}

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("សូមបញ្ចូលឈ្មោះ"),
  sex: Yup.string().required("សូមជ្រើសរើស"),
  dateOfBirth: Yup.string().required("មិនអាចទទេបានទេ"),
  grade: Yup.string().required("មិនអាចទទេបានទេ"),
  classGroup: Yup.string().when("grade", {
    is: (grade) => ["11", "12"].includes(grade),
    then: (schema) => schema.required("មិនអាចទទេបានទេ")
  }),
  provinceCode: Yup.string().when("grade", requireGrade),
  districtCode: Yup.string().when("grade", requireGrade),
  communeCode: Yup.string().when("grade", requireGrade),
  highSchoolCode: Yup.string().when("grade", requireGrade)
});

const FormScreen = ({onSubmit}) => {
  const noValue = [{ "code": "", "label": "សូមជ្រើសរើស" }];
  const title = 'បំពេញប្រវត្តិរូបសង្ខេប';

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

  const renderPicker = (params) => {
    return (
      <View style={styles.formGroup}>
        <PickerSpecific {...params} />
      </View>
    )
  }

  const initialValue = {
    fullName: '',
    sex: '',
    dateOfBirth: '',
    grade: '',
    classGroup: '',
    provinceCode: '',
    districtCode: '',
    communeCode: '',
    highSchoolCode: ''
  }

  const filterOption = (items, parendcode) => {
    return items.filter((item) => item.parent_code == parendcode);
  }

  const isGradeSelected = (values) => {
    return !!values.grade && values.grade != 'other'
  }

  const renderBottomSheetPicker = (title, placeholder, bottomSheetTitle, name, items, selectedFieldName = null) => {
    return <View style={styles.formGroup}>
              <CustomBottomSheetPicker
                title={title}
                placeholder={placeholder}
                bottomSheetTitle={bottomSheetTitle}
                required={true}
                items={items}
                fieldName={name}
                selectedFieldName={selectedFieldName}
              />
           </View>
  }

  const renderContent = (values) => {
    return (
      <TouchableWithoutFeedback>
        <View style={{padding: 16}}>
          { renderFullName() }
          { renderGender() }
          { renderDateOfBirth() }
          {/* { renderPicker({label: 'ជាសិស្សថ្នាក់ទី', name: 'grade', options: noValue.concat(grades)}) } */}

          {renderBottomSheetPicker('ជាសិស្សថ្នាក់ទី', 'សូមជ្រើសរើសថ្នាក់ដែលប្អូនកំពុងសិក្សា', 'ជ្រើសរើសថ្នាក់ដែលប្អូនកំពុងសិក្សា', 'grade', grades)}

          { isGradeSelected(values) &&
            <View>
              { ["11", "12"].includes(values['grade']) && renderBottomSheetPicker('ជាសិស្សក្នុងបណ្តុំថ្នាក់', 'សូមជ្រើសរើសបណ្ដុំថ្នាក់', 'ជ្រើសរើសបណ្ដុំថ្នាក់ដែលប្អូនកំពុងសិក្សា', 'classGroup', filterOption(classGroups, values.grade)) }
              { renderBottomSheetPicker('ខេត្ត/ក្រុង', 'សូមជ្រើសរើសខេត្ត/ក្រុង', 'ជ្រើសរើសខេត្ត/ក្រុងដែលប្អូនកំពុងរស់នៅ', 'provinceCode', provinces, 'code')}
              { renderBottomSheetPicker('ស្រុក/ខណ្ឌ', 'សូមជ្រើសរើសស្រុក/ខណ្ឌ', 'ជ្រើសរើសស្រុក/ខណ្ឌដែលប្អូនកំពុងរស់នៅ', 'districtCode', filterOption(districts, values.provinceCode))}
              { renderBottomSheetPicker('ឃុំ/សង្កាត់', 'សូមជ្រើសរើសឃុំ/សង្កាត់', 'ជ្រើសរើសឃុំ/សង្កាត់ដែលប្អូនកំពុងរស់នៅ', 'communeCode', filterOption(communes, values.districtCode))}
              { renderBottomSheetPicker('រៀននៅសាលា', 'សូមជ្រើសរើសសាលារៀន', 'ជ្រើសរើសរៀននៅសាលាដែលប្អូនកំពុងសិក្សា', 'highSchoolCode', filterOption(highSchools, values.districtCode))}

              {/* { ["11", "12"].includes(values['grade']) && renderPicker({label: 'ជាសិស្សក្នុងបណ្តុំថ្នាក់', name: 'classGroup', options: noValue.concat(filterOption(classGroups, values.grade)) }) }
              { renderPicker({label: 'ខេត្ត/ក្រុង', name: 'provinceCode', options: noValue.concat(provinces) })}
              { renderPicker({label: 'ស្រុក/ខណ្ឌ', name: 'districtCode', options: noValue.concat(filterOption(districts, values.provinceCode)) })}
              { renderPicker({label: 'ឃុំ/សង្កាត់', name: 'communeCode', options: noValue.concat(filterOption(communes, values.districtCode)) })}
              { renderPicker({label: 'រៀននៅសាលា', name: 'highSchoolCode', options: noValue.concat(filterOption(highSchools, values.districtCode)) })} */}
            </View>
          }
        </View>
      </TouchableWithoutFeedback>
    )
  }

  return (
    <Formik
      initialValues={initialValue}
      onSubmit={ onSubmit }
      validationSchema={validationSchema} >

      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={{flex: 1}}>
          <ScrollableHeader
            style={{backgroundColor: '#fff'}}
            renderContent={ () => renderContent(values) }
            renderNavigation={ () => <BackButton /> }
            title={title}
            largeTitle={title}
          />

          <SubmitButton title="រក្សាទុក"/>
        </View>
      )}
    </Formik>
  )
}

export default FormScreen;
