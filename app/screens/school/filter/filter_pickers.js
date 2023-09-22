import React, {useEffect} from 'react';
import { ScrollView } from 'react-native';
import { useFormikContext } from "formik";
import { useNavigation } from '@react-navigation/native';

import CustomBottomSheetPicker from '../../../components/shared/CustomBottomSheetPicker';
import FooterBar from '../../../components/footer/FooterBar';
import {screenHorizontalPadding} from '../../../constants/component_constant';
import {schoolCategories} from '../../../constants/school_filter_constant';
import schoolUtil from '../../../utils/school_util';
import schoolFilterHelper from '../../../helpers/school_filter_helper';

const FilterPickers = (props) => {
  const navigation = useNavigation();
  const { setFieldValue, values } = useFormikContext();

  useEffect(() => {
    schoolUtil.getSelectedProvince((province) => { setFieldValue('province', !province ? '0' : province) })
    schoolUtil.getSelectedCategory(category => { setFieldValue('category', !category ? '0' : category) })
    schoolUtil.getSelectedDepartment(department => { setFieldValue('department', !department ? '0' : department) })
    schoolUtil.getSelectedMajor((major) => { setFieldValue('major', !major ? '0' : major) })
  }, []);

  const pickerItems = {
    'province': { options: schoolUtil.getProvincesForPicker(props.kink), title: 'ជ្រើសរើសទីតាំង', bottomSheetTitle: 'ជ្រើសរើសទីតាំងរបស់គ្រឹះស្ថានសិក្សា', fieldName: 'province', isSearchable: false },
    'category': { options: schoolCategories, title: 'ប្រភេទគ្រឹះស្ថាន', bottomSheetTitle: 'ជ្រើសរើសប្រភេទគ្រឹះស្ថាន', fieldName: 'category', isSearchable: false },
    'department': { options: schoolUtil.getDepartmentsForPicker(values.province), title: 'កម្រិតសញ្ញាបត្រ', bottomSheetTitle: 'ជ្រើសរើសកម្រិតសញ្ញាបត្រ', fieldName: 'department', isSearchable: false },
    'major': { options: schoolUtil.getMajorsForPicker(values.province, values.category, values.department), title: 'ជំនាញសិក្សា', bottomSheetTitle: 'ជ្រើសរើសជំនាញសិក្សា',
               fieldName: 'major', isSearchable: true, searchPlaceholder: 'ស្វែងរកជំនាញ'
             }
  }

  const setFilterValues = () => {
    schoolUtil.setSelectedProvince(values.province == '0' ? '' : values.province);
    schoolUtil.setSelectedMajor(values.major == '0' ? '' : values.major);
    schoolUtil.setSelectedCategory(values.category == '0' ? '' : values.category);
    schoolUtil.setSelectedDepartment(values.department == '0' ? '' : values.department);

    // firebase.analytics().logEvent(keyword.INSTITUTION_FILTER_APPLIED);
    props.refreshValue();
    navigation.goBack();
  }

  const renderPickers = () => {
    return Object.keys(pickerItems).map((key, index) => {
      const item = pickerItems[key];
      if (props.kind != 'tvet_institute' && key == 'department')
        return;

      return <CustomBottomSheetPicker
                key={index}
                title={item.title}
                placeholder={item.title}
                bottomSheetTitle={item.bottomSheetTitle}
                required={false}
                items={item.options}
                fieldName={item.fieldName}
                selectedFieldName={'code'}
                disabled={item.options.length == 0}
                snapPoints={schoolFilterHelper.getPickerDimension(key).snapPoints}
                contentHeight={schoolFilterHelper.getPickerDimension(key).contentHeight}
                containerStyle={{marginTop: 26}}
                isSearchable={item.isSearchable}
                searchPlaceholder={item.searchPlaceholder || ''}
             />
    })
  }


  return (
    <React.Fragment>
      <ScrollView contentContainerStyle={{paddingHorizontal: screenHorizontalPadding, backgroundColor: 'white'}}>
        {renderPickers()}
      </ScrollView>

      <FooterBar text='យល់ព្រម' onPress={() => setFilterValues()} />
    </React.Fragment>
  )
}

export default FilterPickers;