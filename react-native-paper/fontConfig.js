import { FontSetting } from '../app/assets/style_sheets/font_setting';

export const fontConfig = {
  // ios: {
  //   regular: {
  //     fontFamily: 'sans-serif',
  //     fontWeight: 'normal',
  //   },
  //   medium: {
  //     fontFamily: 'sans-serif-medium',
  //     fontWeight: 'normal',
  //   },
  // },
  android: {
    regular: {
      fontFamily: 'KantumruyRegular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'KantumruyBold',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'KantumruyLight',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'KantumruyLight',
      fontWeight: 'normal',
    },
    default: {
      fontFamily: 'KantumruyRegular',
      fontSize: FontSetting.text,
    }
  }
};
