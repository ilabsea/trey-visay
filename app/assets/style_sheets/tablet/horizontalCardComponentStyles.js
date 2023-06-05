import { StyleSheet, Platform } from 'react-native';
import { cardBorderRadius } from '../../../constants/component_constant';
import {getiPadStyle, getAndroidTabletStyle} from '../../../utils/responsive_util';
import color from '../../../themes/color'
import {FontSetting} from '../../../assets/style_sheets/font_setting';

const horizontalCardComponentStyles = StyleSheet.create({
  container: {
    borderRadius: cardBorderRadius,
    paddingHorizontal: 16,
    width: '100%',
    ...Platform.select({
      ios: {
        height: getiPadStyle(140, 140, 160),
      },
      android: {
        height: getAndroidTabletStyle(115, 130),
      }
    })
  },
  labelContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: FontSetting.title
  },
  rightBtnContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  startLabel: {
    color: color.pressable,
    marginRight: 4,
    fontSize: FontSetting.text
  },
  arrowIcon: {
    color: color.pressable
  }
});

export default horizontalCardComponentStyles;
