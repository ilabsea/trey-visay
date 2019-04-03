import { StyleSheet , Platform } from 'react-native';
import { FontSetting } from './font_setting';

export default StyleSheet.create({
  headerTitleStyle: {
    color: '#fff',
    fontSize: FontSetting.nav_title,
    marginLeft: 20,
  },
  headerStyle: {
    backgroundColor: '#1976d2'
  },
  headerStyleProfile: {
    backgroundColor: '#1976d2',
    ...Platform.select({
      android: {
        marginTop: 20
      }
    })
  },
  saveText: {
    color: '#fff',
    marginRight: 16,
    fontSize: FontSetting.text,
  },
  actionWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: "flex-start"
  },
  body2: {
    fontWeight: 'bold',
    fontSize: FontSetting.text
  }
})
