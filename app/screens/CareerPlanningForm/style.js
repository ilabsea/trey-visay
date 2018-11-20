import { StyleSheet } from 'react-native';
import { fontStyles } from '../../assets/style_sheets/app_styles';

export default StyleSheet.create({
  footerWrapper: {
    backgroundColor: '#4caf50',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 60,
  },
  btnNext: {
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: fontStyles.main,
    fontWeight: 'bold'
  },
  label: {
    fontFamily: fontStyles.main,
    fontWeight: 'bold'
  },
  tagLabel: {
    borderRadius: 3,
    marginRight: 5,
    paddingHorizontal: 5,
    backgroundColor: '#4caf50',
    color: '#fff'
  },
});
