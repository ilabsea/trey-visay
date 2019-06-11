import { StyleSheet , Platform} from 'react-native';
import { FontSetting } from './font_setting';

export default StyleSheet.create({
  container: {
    ...Platform.select({
      android: {
        margin: 16
      },
      ios: {
        margin: 8
      }
    })
  },
  box: {
    backgroundColor: '#fff',
    padding: 24,
  },
  title: {
    fontSize: FontSetting.big_title,
    color: '#1976d2',
    ...Platform.select({
      android: {
        lineHeight: 48
      }
    })
  },
  logoWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 20,
  },
  logo: {
    width: 60,
    height: 60
  },
  text: {
    fontWeight: 'bold'
  },
  button: {
    borderRadius: 3,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: '100%'
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: FontSetting.button_text,
    color: '#fff',
  },
  header: {
    backgroundColor: 'rgba(24, 118, 211, 0.2)',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  curveBox: {
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 16,
    backgroundColor: '#fff'
  }
})
