import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {isLowPixelDensityDevice} from '../utils/responsive_util';

export const schoolCategories = [
  { code: '0', label: 'គ្រប់ប្រភេទគ្រឹះស្ថាន' },
  { code: 'public', label: 'សាលារដ្ឋ' },
  { code: 'private', label: 'សាលាឯកជន' },
  { code: 'ngo', label: 'អង្គការ'}
]

export const filterPickerBottomSheets = {
  'category': { snapPoints: isLowPixelDensityDevice() ? [hp('47%')] : [hp('44')], contentHeight: isLowPixelDensityDevice() ? hp('44.5%') : hp('40%') },
  'default': { snapPoints: [hp('80%')], contentHeight: hp('76%') },
}