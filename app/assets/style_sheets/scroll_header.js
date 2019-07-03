import { StyleSheet , Platform } from 'react-native';
import { FontSetting } from './font_setting';

export default StyleSheet.create({
  numberWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberIcon: {
    backgroundColor: '#fff',
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inactiveIcon: {
    backgroundColor: 'rgb(13,82,150)'
  },
  doneIconWrapper: {
    position: 'absolute',
    right: -2,
    top: -2,
    zIndex: 1
  },
  doneIcon: {
    backgroundColor: '#fff',
    width: 14,
    height: 14,
    borderRadius: 7,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  },
  progressTextWrapper: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 5,
    paddingTop: 6,
    width: 110,
    backgroundColor: 'rgb(22, 99, 176)'
  },
  progressText: {
    color: '#fff',
    fontSize: 13,
    lineHeight: 22
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
    fontSize: FontSetting.title,
  },
  navTitle: {
    color: '#fff',
    fontSize: FontSetting.nav_title,
  },
  largeTitle: {
    fontSize: FontSetting.nav_large_title,
    lineHeight: FontSetting.navLargeTitleLineHeight,
    paddingTop: 16,
    paddingLeft: 1,
    color: '#111'
  },
  largeTitlePosition: {
    position: 'absolute',
    left: 20,
    right: 0,
    bottom: 10
  },
  subTitle: {
    fontSize: 13,
    lineHeight: 24
  },
  whiteNavTitle: {
    color: '#fff',
    fontSize: FontSetting.nav_title
  }
});
