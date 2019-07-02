import RF from "react-native-responsive-fontsize";
import { Dimensions, Platform } from 'react-native';

let { width } = Dimensions.get('window');

const FontSetting = {
  nav_large_title: RF(4),
  big_title: RF(3),
  nav_title: RF(2.8),
  tab_label: RF(2.5),
  medium_title: RF(2.5),
  dashboard_subtitle: RF(2.3),
  text: RF(2.2),
  title: RF(2.4),
  small_text: Platform.OS =='ios' ? RF(2.2) : RF(1.8),
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
  FontSetting.nav_title = 18;
}

export { FontSetting };
