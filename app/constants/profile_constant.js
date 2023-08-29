import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {getStyleOfOS} from '../utils/responsive_util';

export const pickerBottomSheet = {
  'grade': { snapPoints: getStyleOfOS([376], [386]), contentHeight: getStyleOfOS(342, 362) },
  'classGroup': { snapPoints: getStyleOfOS([208], [218]), contentHeight: getStyleOfOS(174, 192) },
  'otherGrade': { snapPoints: getStyleOfOS([280], [271]), contentHeight: getStyleOfOS(248, 247) },
  'default': { snapPoints: [hp('60%')], contentHeight: hp('56%') }
}

export const otherGrades = [
  { label: 'ក្រោមថ្នាក់ទី៩', value: "under_grade_nine" },
  { label: 'និស្សិតសកលវិទ្យាល័យ', value: "university_student" },
  { label: 'មុខរបរផ្សេងៗ', value: "other_occupation" },
]