import React from 'react';
import {Platform} from 'react-native';
import {BottomSheetPicker} from 'react-native-bottom-sheet-picker';
import { useFormikContext } from "formik";

import Color from '../../themes/color';
import {FontFamily} from '../../themes/font';
import {FontSetting} from '../../assets/style_sheets/font_setting';
import {defaultBottomSheetContentHeight, defaultBottomSheetSnapPoints} from '../../constants/modal_constant';
import {inputBoxBorderRadius} from '../../constants/component_constant';
import { ErrorMessage } from '../forms';

const CustomBottomSheetPickerComponent = (props) => {
  const { setFieldValue, values, errors, touched } = useFormikContext();
  const colorSet = (type) => {
    const colors = {
      primary: props.disabled ? Color.gray : Color.primaryColor,
      text: props.disabled ? Color.gray : Color.blackColor,
      title: props.disabled ? Color.gray : Color.lightBlackColor
    }
    return colors[type];
  }

  return <React.Fragment>
          <BottomSheetPicker
            {...props}
            primaryColor={colorSet('primary')}
            secondaryColor={Color.secondaryColor}
            titleStyle={[{color: colorSet('title'), fontSize: FontSetting.sub_title}, props.titleStyle]}
            pickerStyle={{backgroundColor: 'white', borderColor: Color.borderColor, borderWidth: 0.5, borderRadius: inputBoxBorderRadius, paddingLeft: 12, paddingRight: 4}}
            bottomSheetTitleStyle={[{fontSize: FontSetting.title, fontFamily: FontFamily.bold, lineHeight: 28, marginTop: 6}, Platform.OS === 'android' && {fontWeight: 'normal'}]}
            placeholderStyle={[{fontSize: FontSetting.text, fontFamily: FontFamily.regular, alignSelf: 'center', color: colorSet('text')}, props.placeholderStyle]}
            itemTextStyle={{fontSize: FontSetting.text, fontFamily: FontFamily.regular}}
            snapPoints={props.snapPoints || defaultBottomSheetSnapPoints}
            pickerContentHeight={props.contentHeight || defaultBottomSheetContentHeight}
            hideListItemAudio={true}
            selectedItem={values[props.fieldName]}
            onSelectItem={(item) => {setFieldValue(props.fieldName, item)}}
            showRadioStyle={true}
            isOutlined={true}
            titleFontFamily={FontFamily.regular}
            requiredTitleStyle={{fontSize: FontSetting.sub_title}}
          />
          <ErrorMessage error={errors[props.fieldName]} visible={touched[props.fieldName]} style={{marginBottom: -10}} />
        </React.Fragment>
}

export default CustomBottomSheetPickerComponent;