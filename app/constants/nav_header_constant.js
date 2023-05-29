import {Platform, StatusBar} from 'react-native'
import DeviceInfo from 'react-native-device-info'
import {pressableItemSize} from './component_constant'

const headerHeight = 64;
export const STATUSBAR_HEIGHT = Platform.OS == 'android' ? StatusBar.currentHeight : 0;

export const IPHONE_HEADER_HEIGHT = (Platform.OS === 'ios' && DeviceInfo.hasNotch()) ? 24 : 0;
export const DEFAULT_HEADER_MAX_HEIGHT = 140 - STATUSBAR_HEIGHT + IPHONE_HEADER_HEIGHT;
export const DEFAULT_HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 64 + IPHONE_HEADER_HEIGHT : headerHeight;
export const DEFAULT_HEADER_COLOR = '#fff';
export const DEFAULT_TEXT_COLOR = '#111';
export const NAVIGATION_BUTTON_WIDTH = pressableItemSize;