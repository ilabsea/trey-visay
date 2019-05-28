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
  },
  largeTitle: {
    color: '#fff',
    fontSize: 28,
    lineHeight: 48
  }
});
