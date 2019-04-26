import { StyleSheet } from 'react-native';
import { FontSetting } from '../font_setting';

export default StyleSheet.create({
  scrollContainer: {
    padding: 0
  },
  btnBox: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#d3d3d3',
    margin: 0,
    borderWidth: 0.5,
    minHeight: '50%'
  },
  btnLabel: {
    color: '#1976d2',
    width: '100%',
    fontSize: FontSetting.big_title,
    textAlign: 'center'
  },
  btnDescription: {
    textAlign: 'center',
    fontSize: FontSetting.dashboard_subtitle,
    padding: 5
  },
  btnFab: {
    width: 80,
    height: 80,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 24
  }
})
