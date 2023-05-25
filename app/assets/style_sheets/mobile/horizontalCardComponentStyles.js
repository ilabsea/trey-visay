import { StyleSheet } from 'react-native';
import {
  cardBorderRadius,
  cardTitleFontSize,
  descriptionFontSize
} from '../../../constants/component_constant';
import color from '../../../themes/color';

const horizontalCardComponentStyles = StyleSheet.create({
  container: {
    borderRadius: cardBorderRadius,
    // height: 112,
    // height: 142,
    paddingLeft: 12,
    paddingRight: 4,
    width: '100%',
  },
  title: {
    fontSize: cardTitleFontSize
  },
  startLabel: {
    fontSize: descriptionFontSize,
    color: color.primaryColor
  },
  arrowIcon: {
    color: color.arrowIcon
  }
});

export default horizontalCardComponentStyles;
