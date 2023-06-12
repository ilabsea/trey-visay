import React from 'react';
import {View, TouchableWithoutFeedback, Keyboard} from 'react-native';

import styles from '../../assets/style_sheets/profile_form';
import CustomBottomSheetPicker from '../../components/shared/CustomBottomSheetPicker';

import grades from '../../data/json/grades.json';
import classGroups from '../../data/json/class_groups.json';
import provinces from '../../data/json/address/provinces.json';
import communes from '../../data/json/address/communes.json';
import districts from '../../data/json/address/districts.json';
import highSchools from '../../data/json/address/highSchools.json';

import { Text } from '../../components';
import { Form, SubmitButton } from '../../components/forms';
import * as Yup from "yup";
import { GenderOption, TextInput, DatePicker } from './FormComponent';
import { Formik } from "formik";
import { FooterBar, BackButton, ScrollableHeader } from '../../components';
import profileFormHelper from '../../helpers/profile_form_helper';

const requireGrade = {
  is: (grade) => grade != 'other',
  then: (schema) => schema.required("មិនអាចទទេបានទេ")
}

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("សូមបញ្ចូលឈ្មោះ"),
  sex: Yup.string().required("សូមជ្រើសរើស"),
  dateOfBirth: Yup.string().required("សូមបញ្ចូលថ្ងៃខែឆ្នាំកំណើត"),
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
          label="លេខទូរស័ព្ទ"
          iconName="phone"
          inputMode='tel'
          maxLength={10}
        />
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
    return <View style={[styles.formGroup, {marginTop: 12}]}>
              <CustomBottomSheetPicker
                title={title}
                placeholder={placeholder}
                bottomSheetTitle={bottomSheetTitle}
                required={true}
                items={items}
                fieldName={name}
                selectedFieldName={selectedFieldName}
                disabled={items.length == 0}
                snapPoints={profileFormHelper.getPickerDimension(name).snapPoints}
                contentHeight={profileFormHelper.getPickerDimension(name).contentHeight}
              />
           </View>
  }

  const renderContent = (values) => {
    return (
      <View style={{padding: 16, flexGrow: 1}}>
        { renderFullName() }
        { renderGender() }
        { renderDateOfBirth() }
        { renderPhoneNumber() }
        {renderBottomSheetPicker('ជាសិស្សថ្នាក់ទី', 'សូមជ្រើសរើសថ្នាក់ដែលប្អូនកំពុងសិក្សា', 'ជ្រើសរើសថ្នាក់ដែលប្អូនកំពុងសិក្សា', 'grade', grades, 'value')}

        { isGradeSelected(values) &&
          <View>
            { ["11", "12"].includes(values['grade']) && renderBottomSheetPicker('ជាសិស្សក្នុងបណ្តុំថ្នាក់', 'សូមជ្រើសរើសបណ្ដុំថ្នាក់', 'ជ្រើសរើសបណ្ដុំថ្នាក់ដែលប្អូនកំពុងសិក្សា', 'classGroup', filterOption(classGroups, values.grade), 'code') }
            { renderBottomSheetPicker('ខេត្ត/ក្រុង', 'សូមជ្រើសរើសខេត្ត/ក្រុង', 'ជ្រើសរើសខេត្ត/ក្រុងដែលប្អូនកំពុងសិក្សា', 'provinceCode', provinces, 'code') }
            { renderBottomSheetPicker('ស្រុក/ខណ្ឌ', 'សូមជ្រើសរើសស្រុក/ខណ្ឌ', 'ជ្រើសរើសស្រុក/ខណ្ឌដែលប្អូនកំពុងសិក្សា', 'districtCode', filterOption(districts, values.provinceCode), 'code') }
            { renderBottomSheetPicker('ឃុំ/សង្កាត់', 'សូមជ្រើសរើសឃុំ/សង្កាត់', 'ជ្រើសរើសឃុំ/សង្កាត់ដែលប្អូនកំពុងសិក្សា', 'communeCode', filterOption(communes, values.districtCode), 'code') }
            { renderBottomSheetPicker('រៀននៅសាលា', 'សូមជ្រើសរើសសាលារៀន', 'ជ្រើសរើសរៀននៅសាលាដែលប្អូនកំពុងសិក្សា', 'highSchoolCode', filterOption(highSchools, values.districtCode), 'code') }
          </View>
        }
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
              renderNavigation={ () => <BackButton /> }
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
