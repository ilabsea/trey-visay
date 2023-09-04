import {StyleSheet, Platform} from 'react-native';
import color from '../../../themes/color';
import componentUtil from '../../../utils/component_util';
import {isLowPixelDensityDevice, isShortScreenDevice} from '../../../utils/responsive_util';
import {FontSetting} from '../../../assets/style_sheets/font_setting';

const tiltedCardComponentStyles = StyleSheet.create({
  container: {
    maxHeight: isShortScreenDevice() ? 140 : 155,
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
  titleContainer: {
    alignItems: 'center',
    top: isShortScreenDevice() ? -15 : -20
  },
  title: {
    fontSize: FontSetting.text,
    paddingHorizontal: 8,
  }
});

export default tiltedCardComponentStyles;
