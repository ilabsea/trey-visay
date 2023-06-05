import React from 'react';
import {BottomSheetPicker} from 'react-native-bottom-sheet-picker';
import { useFormikContext } from "formik";

import Color from '../../themes/color';
import {FontFamily} from '../../themes/font';
import {FontSetting} from '../../assets/style_sheets/font_setting';
import {defaultBottomSheetContentHeight} from '../../constants/modal_constant';

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
            titleStyle={[{marginTop: 2, fontSize: FontSetting.text, fontFamily: FontFamily.regular, color: Color.paleBlackColor, marginBottom: 0}, props.titleStyle]}
            pickerStyle={{backgroundColor: colorSet('background'), borderColor: Color.gray, borderWidth: 1, borderRadius: 6, paddingLeft: 12, paddingRight: 4}}
            bottomSheetTitleStyle={{fontSize: FontSetting.title, fontFamily: FontFamily.bold}}
            placeholderStyle={[{fontSize: FontSetting.text, fontFamily: FontFamily.regular, alignSelf: 'center', color: colorSet('text')}, props.placeholderStyle]}
            itemTextStyle={{fontSize: FontSetting.text, fontFamily: FontFamily.regular}}
            pickerContentHeight={defaultBottomSheetContentHeight}
            hideListItemAudio={true}
            selectedItem={values[props.fieldName]}
            onSelectItem={(item) => setFieldValue(props.fieldName, item)}
            // showRadioStyle={true}
            showCheckIcon={true}
          />
}

export default CustomBottomSheetPickerComponent;