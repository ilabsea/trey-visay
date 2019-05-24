import { StyleSheet , Platform } from 'react-native';
import { FontSetting } from './font_setting';

// parallax view
const SCREEN_HEIGHT = 1000
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
export const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;


export default StyleSheet.create({
  numberWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberIcon: {
    backgroundColor: '#fff',
    width: 30, height: 30,
    borderRadius: 15,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inactiveIcon: {
    backgroundColor: 'rgb(13,82,150)'
  },
  iconText: {
    fontSize: 20,
    color: 'rgb(24,118,211)'
  },
  line: {
    flex: 0.8,
    height: 3,
    backgroundColor: 'rgb(13,82,150)',
    margin: 5
  },
  title: {
    color: '#fff',
    fontSize: 18,
  }

});
