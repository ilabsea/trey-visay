import { StyleSheet } from 'react-native';
import { AppStyles } from '../../assets/style_sheets/app_styles';

export default StyleSheet.create({
  scrollContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  buttonText: {
    fontSize: 18,
    color: 'black'
  },
  subTitle: {
    fontSize: 20,
    fontFamily: AppStyles.fonts.second,
    textAlign: 'center'
  },
  paragraph: {
    marginVertical: 10
  },
  button: {
    backgroundColor: 'green',
    padding: 16,
    alignItems: 'center',
    borderRadius: 3
  },
  btnText: {
    fontFamily: AppStyles.fonts.mainBold,
    fontSize: 16,
    color: '#fff',
  }

});
