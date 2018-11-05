import { StyleSheet } from 'react-native';
import { AppStyles } from './app_styles';

export default StyleSheet.create({
  headerTitleStyle: {
    color: '#fff',
    fontSize: 20,
    lineHeight: 30,
    fontFamily: AppStyles.fonts.second,
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
    fontFamily: AppStyles.fonts.second,
  },
  actionWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  body2: {
    fontFamily: AppStyles.fonts.mainBold,
    fontSize: 14
  }
})
