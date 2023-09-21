import { StyleSheet } from 'react-native';
import {cardBorderRadius} from '../../../constants/component_constant';
import color from '../../../themes/color';
import {FontSetting} from '../../../assets/style_sheets/font_setting';
import {isShortScreenDevice} from '../../../utils/responsive_util';

const horizontalCardComponentStyles = StyleSheet.create({
  container: {
    borderRadius: cardBorderRadius,
    height: isShortScreenDevice () ? 95 : 110,
    paddingHorizontal: 12,
    width: '100%',
  },
  labelContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  title: {
    fontSize: FontSetting.text
  },
  rightBtnContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  startLabel: {
    color: color.primaryColor,
    marginRight: 4,
    fontSize: FontSetting.text - 1,
  },
  arrowIcon: {
    color: color.pressable
  }
});

export default horizontalCardComponentStyles;
