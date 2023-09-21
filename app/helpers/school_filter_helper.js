import {filterPickerBottomSheets} from '../constants/school_constant';

const schoolFilterHelper = (() => {
  return {
    getPickerDimension
  }

  function getPickerDimension(type) {
    return !!filterPickerBottomSheets[type] ? filterPickerBottomSheets[type] : filterPickerBottomSheets.default;
  }
})();

export default schoolFilterHelper;