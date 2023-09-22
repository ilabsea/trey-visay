import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {getStyleOfOS} from '../utils/responsive_util';

export const schoolCategories = [
  { code: 'null', label: 'គ្រប់ប្រភេទគ្រឹះស្ថាន' },
  { code: 'public', label: 'សាលារដ្ឋ' },
  { code: 'private', label: 'សាលាឯកជន' },
  { code: 'ngo', label: 'អង្គការ'}
]

export const filterPickerBottomSheets = {
  'category': { snapPoints: [hp('44%')], contentHeight: hp('40%') },
  'major': { snapPoints: [hp('80%')], contentHeight: hp('76%') },
  'default': { snapPoints: [hp('60%')], contentHeight: hp('56%') }
}