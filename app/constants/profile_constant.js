import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {getStyleOfOS} from '../utils/responsive_util';

export const pickerBottomSheet = {
  'grade': { snapPoints: getStyleOfOS([376], [386]), contentHeight: getStyleOfOS(342, 362) },
  'classGroup': { snapPoints: getStyleOfOS([208], [218]), contentHeight: getStyleOfOS(174, 192) },
  'default': { snapPoints: [hp('60%')], contentHeight: hp('56%') }
}