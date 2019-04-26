import { StyleSheet  } from 'react-native';
import { FontSetting } from '../font_setting';

export default StyleSheet.create({
  scrollContainer: {
    padding: 8
  },
  btnBox: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    minHeight: 315,
    margin: 10
  },
  btnLabel: {
    color: '#1976d2',
    width: '100%',
    fontSize: FontSetting.big_title,
    textAlign: 'center',
    lineHeight: 48
  },
  btnDescription: {
    textAlign: 'center',
    fontSize: FontSetting.dashboard_subtitle,
    padding: 8
  },
  btnFab: {
    width: 80,
    height: 80,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 18
  }
})
