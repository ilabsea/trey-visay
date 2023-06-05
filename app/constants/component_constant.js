import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { getStyleOfDevice, getStyleOfOS, isLowPixelDensityDevice } from '../utils/responsive_util';
import {xLargeFontSize, largeFontSize} from '../utils/font_size_util';

export const buttonBorderRadius = 10;
export const cardElevation = 2;
export const cardBorderRadius = 10;
export const outlinedButtonBorderWidth = 2.2;
export const navigationHeaderIconSize = 24;
export const navHeaderHorizontalPadding = getStyleOfDevice(12, 0);
export const navHeaderBigTitleHorizontalPadding = getStyleOfDevice(4, 0);
export const navHeaderPaddingTop = getStyleOfOS(DeviceInfo.hasNotch() ? 0 : 4, 14);
export const screenHorizontalPadding = getStyleOfDevice(24, 16);
export const bottomTabBarHeight = 62;
export const scrollViewPaddingBottom = bottomTabBarHeight + 18;
export const cardTitleFontSize = xLargeFontSize();
export const descriptionFontSize = largeFontSize();
export const descriptionLineHeight = getStyleOfDevice(38, isLowPixelDensityDevice() ? 28 : 36);
export const navHeaderHeight = 56;
export const androidBigTabletWidth = 800;
export const gradientScrollViewBigPaddingBottom = getStyleOfDevice(170, 125);
export const gradientScrollViewPaddingBottom = getStyleOfDevice(90, 80);
export const cardTitleLineHeight = getStyleOfDevice(Platform.OS == 'ios' ? 32 : 30, 28);
export const pressableItemSize = 48
export const arrowRightIconSize = getStyleOfDevice(30, 24)
export const inputBoxBorderRadius = 6
export const inputBoxHeight = 56