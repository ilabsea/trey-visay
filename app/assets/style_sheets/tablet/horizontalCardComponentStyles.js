import { StyleSheet, Platform } from 'react-native';
import { cardBorderRadius } from '../../../constants/component_constant';
import {getiPadStyle, getAndroidTabletStyle} from '../../../utils/responsive_util';

const horizontalCardComponentStyles = StyleSheet.create({
  container: {
    borderRadius: cardBorderRadius,
    paddingLeft: 12,
    paddingRight: 4,
    width: '100%',
    ...Platform.select({
      ios: {
        height: getiPadStyle(140, 140, 160),
      },
      android: {
        height: getAndroidTabletStyle(115, 130),
      }
    })
  }
});

export default horizontalCardComponentStyles;
