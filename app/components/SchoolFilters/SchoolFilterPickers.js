import React, {useEffect} from 'react';
import { ScrollView } from 'react-native';
import { useFormikContext } from "formik";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import CustomBottomSheetPicker from '../shared/CustomBottomSheetPicker';
import FooterBar from '../footer/FooterBar';
import {screenHorizontalPadding} from '../../constants/component_constant';
import {schoolCategories} from '../../constants/school_filter_constant';
import schoolUtil from '../../utils/school_util';
import schoolFilterHelper from '../../helpers/school_filter_helper';
import {setSelectedOptions} from '../../redux/features/school/schoolFilterSlice';

const SchoolFilterPickers = (props) => {
  const navigation = useNavigation();
  const { setFieldValue, values } = useFormikContext();
  const dispatch = useDispatch();
  const schoolFilterOptions = useSelector(state => state.schoolFilterOptions.value);

  useEffect(() => {
    const {province, category, major, department} = schoolFilterOptions;
    setFieldValue('province', !province ? '0' : province);
    setFieldValue('category', !category ? '0' : category);
    setFieldValue('department', !department ? '0' : department);
    setFieldValue('major', !major ? '0' : major);
  }, []);

  const pickerItems = {
    'province': { options: schoolUtil.getProvincesForPicker(props.kind), title: 'ជ្រើសរើសទីតាំង', bottomSheetTitle: 'ជ្រើសរើសទីតាំងរបស់គ្រឹះស្ថានសិក្សា', fieldName: 'province', isSearchable: false },
    'category': { options: schoolCategories, title: 'ប្រភេទគ្រឹះស្ថាន', bottomSheetTitle: 'ជ្រើសរើសប្រភេទគ្រឹះស្ថាន', fieldName: 'category', isSearchable: false },
    'department': { options: schoolUtil.getDepartmentsForPicker(values.province), title: 'កម្រិតសញ្ញាបត្រ', bottomSheetTitle: 'ជ្រើសរើសកម្រិតសញ្ញាបត្រ', fieldName: 'department', isSearchable: true, searchPlaceholder: 'ស្វែងរកកម្រិតសញ្ញាបត្រ' },
    'major': { options: schoolUtil.getMajorsForPicker(values.province, values.category, values.department), title: 'ជំនាញសិក្សា', bottomSheetTitle: 'ជ្រើសរើសជំនាញសិក្សា',
               fieldName: 'major', isSearchable: true, searchPlaceholder: 'ស្វែងរកជំនាញ'
             }
  }

  const saveSelectedFilters = () => {
    const selectedOptions = {
      province: values.province == '0' ? '' : values.province,
      category: values.category == '0' ? '' : values.category,
      major: values.major == '0' ? '' : values.major,
      department: values.department == '0' ? '' : values.department
    }
    // firebase.analytics().logEvent(keyword.INSTITUTION_FILTER_APPLIED);
    dispatch(setSelectedOptions(selectedOptions));
    navigation.goBack();
  }

  const onSelectItem = (fieldName, item) => {
    if (fieldName == 'province' || fieldName == 'category' || fieldName == 'department')
      setFieldValue('major', '0')
    if (fieldName == 'province')
      setFieldValue('department', '0')
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
                placeholderAudio={null}
                bottomSheetTitle={item.bottomSheetTitle}
                required={false}
                items={item.options}
                fieldName={item.fieldName}
                selectedFieldName={'code'}
                disabled={item.options.length == 0}
                snapPoints={schoolFilterHelper.getPickerDimension(key).snapPoints}
                contentHeight={schoolFilterHelper.getPickerDimension(key).contentHeight}
                containerStyle={{marginTop: index == 0 ? 20 : 26, marginBottom: 2}}
                isSearchable={item.isSearchable}
                searchPlaceholder={item.searchPlaceholder || ''}
                onSelectItem={(value) => onSelectItem(key, value)}
             />
    })
  }


  return (
    <React.Fragment>
      <ScrollView contentContainerStyle={{paddingHorizontal: screenHorizontalPadding, backgroundColor: 'white'}}>
        {renderPickers()}
      </ScrollView>

      <FooterBar text='យល់ព្រម' onPress={() => saveSelectedFilters()} />
    </React.Fragment>
  )
}

export default SchoolFilterPickers;