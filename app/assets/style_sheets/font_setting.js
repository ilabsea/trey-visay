import RF from "react-native-responsive-fontsize";
import { Dimensions, Platform } from 'react-native';
import {getStyleOfDevice} from '../../utils/responsive_util';

let { width } = Dimensions.get('window');

const FontSetting = {
  nav_large_title: RF(4),
  big_title: RF(3),
  nav_title: getStyleOfDevice(RF(2.2), RF(2.6)),
  tab_label: RF(2.5),
  medium_title: RF(2.5),
  dashboard_subtitle: RF(2.3),
  text: Platform.OS === 'ios' ? getStyleOfDevice(RF(2), RF(2.4)) : getStyleOfDevice(RF(1.9), RF(2.2)),
  title: Platform.OS === 'ios' ? getStyleOfDevice(RF(2.2), RF(2.4)) : RF(2.4),
  small_text: Platform.OS =='ios' ? getStyleOfDevice(RF(1.8), RF(2.2)) : getStyleOfDevice(RF(1.7), RF(1.8)),
  button_text: RF(2.6),
  sub_title: RF(1.8),
  hint: RF(1.6),

  navLargeTitleLineHeight: RF(4.2)
}

if (width <= 600) {
  FontSetting.nav_large_title = 28;
  FontSetting.navLargeTitleLineHeight = 38;
} else {
  FontSetting.nav_large_title = 30;
  FontSetting.navLargeTitleLineHeight = 41;
}

export { FontSetting };
