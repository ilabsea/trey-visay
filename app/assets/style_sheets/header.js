import { StyleSheet } from 'react-native';
import { fontStyles } from './app_styles';

export default StyleSheet.create({
  headerTitleStyle: {
    color: '#fff',
    fontSize: 20,
    lineHeight: 30,
    fontFamily: fontStyles.second,
    marginLeft: 20,
  },
  headerStyle: {
    backgroundColor: '#1976d2'
  },
  saveText: {
    color: '#fff',
    marginLeft: 10,
    marginRight: 16,
    fontSize: 16,
    fontFamily: fontStyles.second,
  },
  actionWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  body2: {
    fontFamily: fontStyles.mainBold,
    fontSize: 14
  }
})
