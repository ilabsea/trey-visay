import {pickerBottomSheet} from '../constants/profile_constant'

const profileFormHelper = (() => {
  return {
    getPickerDimension
  }

  function getPickerDimension(type) {
    return !!pickerBottomSheet[type] ? pickerBottomSheet[type] : pickerBottomSheet.default;
  }
})()

export default profileFormHelper