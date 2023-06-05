import { PixelRatio, Dimensions } from 'react-native';
import { isShortScreenDevice, getStyleOfDevice, isLowPixelDensityDevice } from './responsive_util';
import { XHDPIRatio } from '../constants/screen_size_constant';

const getMobileFontSizeByPixelRatio = (smallRatioFontSize, bigRatioFontSize) => {
  const devicePixelRatio = Math.round(PixelRatio.roundToNearestPixel(PixelRatio.get()));
  const fontSize = devicePixelRatio <= XHDPIRatio ? smallRatioFontSize : bigRatioFontSize;

  return isShortScreenDevice() ? fontSize - 1 : fontSize;
}

export const xxLargeFontSize = () => {
  return getStyleOfDevice(22, mobileFontSize(20));
}

export const xLargeFontSize = () => {
  return getStyleOfDevice(20, mobileFontSize(18));
}

export const largeFontSize = () => {
  return getStyleOfDevice(18, mobileFontSize(16));
}

export const mediumFontSize = () => {
  return getStyleOfDevice(16, mobileFontSize(14));
}

export const smallFontSize = () => {
  return getStyleOfDevice(12, mobileFontSize(10));
}

export const descriptionFontSize = () => {
  const mobileFontSize = isLowPixelDensityDevice() ? 15 : 18
  return getStyleOfDevice(18, mobileFontSize);
}

export const mobileFontSize = (size) => {
  const scale = (Dimensions.get('window').width / 320) + 1;
  if (isLowPixelDensityDevice())
    return size - scale;

  return size;
}
