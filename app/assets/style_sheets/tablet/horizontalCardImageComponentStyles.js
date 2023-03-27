import { StyleSheet } from 'react-native';
import { cardBorderRadius } from '../../../constants/component_constant';

const HorizontalCardImageComponentStyles = StyleSheet.create({
  container:{
    flex: 1
  },
  image: {
    borderRadius: cardBorderRadius,
    elevation: 6,
    width: '100%',
    height: '103%',
    position: 'absolute',
    top: -16,
  }
});

export default HorizontalCardImageComponentStyles;
