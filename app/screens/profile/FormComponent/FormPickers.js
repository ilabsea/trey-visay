import React from 'react';
import {View} from 'react-native';
import { useFormikContext } from "formik";

import styles from '../../../assets/style_sheets/profile_form';
import CustomBottomSheetPicker from '../../../components/shared/CustomBottomSheetPicker';

import grades from '../../../data/json/grades.json';
import classGroups from '../../../data/json/class_groups.json';
import provinces from '../../../data/json/address/provinces.json';
import districts from '../../../data/json/address/districts.json';
import highSchools from '../../../data/json/address/highSchools.json';
import profileFormHelper from '../../../helpers/profile_form_helper';
import {otherGrades} from '../../../constants/profile_constant';

const FormPickers = (props) => {
  const { setFieldValue } = useFormikContext();
  const renderBottomSheetPicker = (title, placeholder, bottomSheetTitle, name, items, selectedFieldName = null, onSelectItem = null) => {
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
                onSelectItem={onSelectItem}
              />
           </View>
  }

  const filterOption = (items, parendcode) => {
    return items.filter((item) => item.parent_code == parendcode);
  }

  const isGradeSelected = () => {
    return !!props.values.grade && props.values.grade != 'other'
  }

  const renderGradePicker = () => {
    return renderBottomSheetPicker('ជាសិស្សថ្នាក់ទី', 'សូមជ្រើសរើសថ្នាក់ដែលប្អូនកំពុងសិក្សា', 'ជ្រើសរើសថ្នាក់ដែលប្អូនកំពុងសិក្សា', 'grade', grades, 'value', (value) => {
      if (value != 'other')
        return setFieldValue('otherGrade', '');

      ['classGroup', 'provinceCode', 'districtCode', 'highSchoolCode'].map(fieldName => {
        setFieldValue(fieldName, '');
      })
    })
  }

  return (
    <React.Fragment>
      {renderGradePicker()}
      {props.values.grade == 'other' && renderBottomSheetPicker('មុខរបរ', 'សូមជ្រើសរើសមុខរបររបស់ប្អូន', 'ជ្រើសរើសមុខរបររបស់ប្អូន', 'otherGrade', otherGrades, 'value')}

      { isGradeSelected() &&
          <View>
            { ["11", "12"].includes(props.values['grade']) && renderBottomSheetPicker('ជាសិស្សក្នុងបណ្តុំថ្នាក់', 'សូមជ្រើសរើសបណ្ដុំថ្នាក់', 'ជ្រើសរើសបណ្ដុំថ្នាក់ដែលប្អូនកំពុងសិក្សា', 'classGroup', filterOption(classGroups, props.values.grade), 'code') }
            { renderBottomSheetPicker('ខេត្ត/ក្រុង', 'សូមជ្រើសរើសខេត្ត/ក្រុង', 'ជ្រើសរើសខេត្ត/ក្រុងដែលប្អូនកំពុងសិក្សា', 'provinceCode', provinces, 'code') }
            { renderBottomSheetPicker('ស្រុក/ខណ្ឌ', 'សូមជ្រើសរើសស្រុក/ខណ្ឌ', 'ជ្រើសរើសស្រុក/ខណ្ឌដែលប្អូនកំពុងសិក្សា', 'districtCode', filterOption(districts, props.values.provinceCode), 'code') }
            { renderBottomSheetPicker('រៀននៅសាលា', 'សូមជ្រើសរើសសាលារៀន', 'ជ្រើសរើសរៀននៅសាលាដែលប្អូនកំពុងសិក្សា', 'highSchoolCode', filterOption(highSchools, props.values.districtCode), 'code') }
          </View>
        }
    </React.Fragment>
  )
}

export default FormPickers;