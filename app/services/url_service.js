import {Linking, Alert, Platform} from 'react-native';
import toastMessageHelper from '../helpers/toast_message_helper';

const urlService = (() => {
  return {
    openUrl,
  }

  async function openUrl(url, label = '') {
    await Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
        return;
      }

      if (Platform.OS == 'android')
        toastMessageHelper.showMessage(`មិនអាចបើកតំណនេះ: ${label || url}`)
      else
        Alert.alert(`មិនអាចបើកតំណនេះ: ${label || url}`);
    });
  }
})();

export default urlService;