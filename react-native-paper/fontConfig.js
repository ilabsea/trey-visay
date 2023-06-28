import { FontSetting } from '../app/assets/style_sheets/font_setting';
import {FontFamily} from '../app/themes/font';

export const fontConfig = {
  ios: {
    medium: {
      fontFamily: FontFamily.regular,
      fontWeight: 'normal',
      fontSize: FontSetting.text,
    }
  },
  android: {
    regular: {
      fontFamily: 'KantumruyRegular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: FontFamily.regular,
      fontWeight: 'normal',
      fontSize: FontSetting.text,
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
