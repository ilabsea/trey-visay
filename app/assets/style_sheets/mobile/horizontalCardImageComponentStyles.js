import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const HorizontalCardImageComponentStyles = StyleSheet.create({
  container:{
    justifyContent: 'center',
    width: wp('22%'),
  },
  image: {
    width: 90,
    height: 86,
  }
});

export default HorizontalCardImageComponentStyles;
