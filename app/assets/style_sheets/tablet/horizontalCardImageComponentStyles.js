import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const HorizontalCardImageComponentStyles = StyleSheet.create({
  container:{
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('22%'),
  },
  image: {
    width: '100%',
    height: hp('10%')
  }
});

export default HorizontalCardImageComponentStyles;
