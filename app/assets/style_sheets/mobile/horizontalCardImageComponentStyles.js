import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const HorizontalCardImageComponentStyles = StyleSheet.create({
  container:{
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('26%')
  },
  image: {
    width: 105,
    height: 86,
  }
});

export default HorizontalCardImageComponentStyles;
