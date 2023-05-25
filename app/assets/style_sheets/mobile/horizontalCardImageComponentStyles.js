import { StyleSheet } from 'react-native';
import { cardBorderRadius } from '../../../constants/component_constant';

const HorizontalCardImageComponentStyles = StyleSheet.create({
  container:{
    flex: 2,
    height: 110
  },
  image: {
    // borderRadius: cardBorderRadius,
    // elevation: 6,
    // width: '100%',
    // height: '100%',
    width: 105,
    height: 86,
    // position: 'absolute',
    // top: -16,
  }
});

export default HorizontalCardImageComponentStyles;
