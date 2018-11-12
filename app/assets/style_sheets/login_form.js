import { StyleSheet } from 'react-native';
import { fontStyles } from './app_styles';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    color: '#fff',
    marginTop: 20,
    fontFamily: fontStyles.second,
  },
  subTitle: {
    fontSize: 24,
    color: '#fff',
    marginVertical: 30,
    fontFamily: fontStyles.second,
  },
  inputText: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  whiteLabel: {
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  linkText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#fff',
    fontFamily: fontStyles.mainBold,
  },
  submitText: {
    fontFamily: fontStyles.mainBold,
    fontSize: 20,
    lineHeight: 32,
  },
  btnLogin: {
    marginTop: 24,
  },
  submitWrapper: {
    marginTop: 24
  },
  iconWrapper: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#1976d2',
    position: 'absolute',
    right: 16,
    top: 16
  }
})
