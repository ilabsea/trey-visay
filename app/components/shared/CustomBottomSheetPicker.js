import React from 'react';
import {Platform} from 'react-native';
import {BottomSheetPicker} from 'react-native-bottom-sheet-picker';
import { useFormikContext } from "formik";

import Color from '../../themes/color';
import {FontFamily} from '../../themes/font';
import {FontSetting} from '../../assets/style_sheets/font_setting';
import {defaultBottomSheetContentHeight, defaultBottomSheetSnapPoints} from '../../constants/modal_constant';
import {inputBoxBorderRadius} from '../../constants/component_constant';

const CustomBottomSheetPickerComponent = (props) => {
  const { setFieldValue, values } = useFormikContext();
  const colorSet = (type) => {
    const colors = {
      background: props.disabled ? Color.disabledCardColor : Color.whiteColor,
      primary: props.disabled ? Color.gray : Color.primaryColor,
      text: props.disabled ? Color.gray : Color.blackColor,
    }
    return colors[type];
  }

  return <BottomSheetPicker
            {...props}
            primaryColor={colorSet('primary')}
            secondaryColor={Color.secondaryColor}
            titleStyle={[{marginTop: 2, fontSize: FontSetting.text, fontFamily: FontFamily.regular, color: Color.lightBlackColor, marginBottom: 0}, props.titleStyle]}
            pickerStyle={{backgroundColor: colorSet('background'), borderColor: Color.borderColor, borderWidth: 0.5, borderRadius: inputBoxBorderRadius, paddingLeft: 12, paddingRight: 4}}
            bottomSheetTitleStyle={[{fontSize: FontSetting.title, fontFamily: FontFamily.bold, lineHeight: 28, marginTop: 6}, Platform.OS === 'android' && {fontWeight: 'normal'}]}
            placeholderStyle={[{fontSize: FontSetting.text, fontFamily: FontFamily.regular, alignSelf: 'center', color: colorSet('text')}, props.placeholderStyle]}
            itemTextStyle={{fontSize: FontSetting.text, fontFamily: FontFamily.regular}}
            snapPoints={props.snapPoints || defaultBottomSheetSnapPoints}
            pickerContentHeight={props.contentHeight || defaultBottomSheetContentHeight}
            hideListItemAudio={true}
            selectedItem={values[props.fieldName]}
            onSelectItem={(item) => {setFieldValue(props.fieldName, item)}}
            showRadioStyle={true}
            outlineColor='red'
          />
}

export default CustomBottomSheetPickerComponent;