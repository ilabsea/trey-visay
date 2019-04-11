import {
  Platform
} from 'react-native';

import DeviceInfo from 'react-native-device-info';

export default class App {
  static getVersion() {
    return Platform.OS + ' ' + DeviceInfo.getVersion();
  }
}
