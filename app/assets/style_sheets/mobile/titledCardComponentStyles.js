import {StyleSheet, Platform} from 'react-native';
import color from '../../../themes/color';
import {cardTitleFontSize} from '../../../constants/component_constant';
import componentUtil from '../../../utils/component_util';
import {isLowPixelDensityDevice} from '../../../utils/responsive_util';

const tiltedCardComponentStyles = StyleSheet.create({
  container: {
    maxHeight: 160,
    // maxHeight: 246,
    width: componentUtil.getGridCardWidth(),
    borderRadius: 70
  },
  tiltedView: {
    backgroundColor: color.whiteColor,
    height: 40,
    width: componentUtil.getGridCardWidth(),
    borderTopLeftRadius: 11,
    borderTopRightRadius: 15,
    transform: [{rotate: "-12deg"}],
    position: 'absolute',
    right: -2.6,
    ...Platform.select({
      ios: {
        borderBottomRightRadius: 40,
        top: isLowPixelDensityDevice() ? -5.5 : -7,
        right: -2.9
      },
      android: {
        borderBottomRightRadius: 26,
        top: isLowPixelDensityDevice() ? -5.5 : -8,
      }
    })
  },
  secondTiltedView: {
    backgroundColor: color.whiteColor,
    borderTopRightRadius: 5,
    height: 40,
    width: 40,
    position: 'absolute',
    right: 0,
    top: -9,
  },
  backgroundContainer: {
    height: '100%',
    paddingTop: 10,
  },
  infoContainer: {
    backgroundColor: color.whiteColor,
    borderRadius: 10,
    borderTopRightRadius: 0,
    flexDirection: 'column',
    flexGrow: 1,
  },
  title: {
    fontSize: cardTitleFontSize,
    // flex: 1,
    paddingHorizontal: 8,
  },
  footer: {
    // flex: 3,
    backgroundColor: 'yellow'
    // paddingTop: 8
  }
});

export default tiltedCardComponentStyles;
