import {Dimensions} from 'react-native';
import {screenHorizontalPadding} from '../constants/component_constant';
import {isLowPixelDensityDevice} from './responsive_util';

const defaultItemSize = 48;

const componentUtil = (() => {
  return {
    pressableItemSize,
    mediumPressableItemSize,
    largePressableItemSize,
    getGridCardWidth,
    tabletPressableItemSize
  }

  function pressableItemSize(padding = 0) {
    return defaultItemSize + padding;
  }

  function mediumPressableItemSize() {
    return isLowPixelDensityDevice() ? pressableItemSize() : pressableItemSize(8);
  }

  function largePressableItemSize() {
    return 60;
  }

  function tabletPressableItemSize() {
    return 56;
  }

  function getGridCardWidth() {
    const screenWidth = Dimensions.get('screen').width;
    return ((screenWidth - (screenHorizontalPadding * 2)) / 2) - 8; // 8 is the margin between the card in a row
  }
})();

export default componentUtil;
