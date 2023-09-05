import { StyleSheet, Platform } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import DeviceInfo from 'react-native-device-info';
import {isShortScreenDevice} from '../../../utils/responsive_util';

const HorizontalCardImageComponentStyles = StyleSheet.create({
  container:{
    justifyContent: 'center',
    width: wp('22%'),
  },
  image: {
    ...Platform.select({
      android: {
        width: '94%',
        height: '65%',
      },
      ios: {
        width: DeviceInfo.hasNotch() ? '92%' : '92%',
        height: DeviceInfo.hasNotch() ? '55%' : isShortScreenDevice() ? '60%' : '55%',
      }
    })
  }
});

export default HorizontalCardImageComponentStyles;
