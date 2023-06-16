import {Platform} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {getStyleOfDevice, isLowPixelDensityDevice} from '../utils/responsive_util';

export const defaultBottomSheetSnapPoints = getStyleOfDevice([hp('60%')], [hp('65%')]);
export const defaultBottomSheetContentHeight = hp('55%');
export const hollandTestResultOptionsSnapPoints = getStyleOfDevice([hp('26%')], Platform.OS === 'ios' ? isLowPixelDensityDevice() ? [hp('40%')] : [hp('36%')] : isLowPixelDensityDevice() ? [hp('40%')] : [hp('34%')])