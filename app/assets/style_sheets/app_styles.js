import { Platform } from 'react-native';

export const fontStyles = {
  // main: 'Kantumruy',
  // mainBold: 'KantumruyBold',
  // second: 'KhmerOureang'
  main: Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto',
  mainBold: Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto',
  second: Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto'
}
