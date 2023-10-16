import {Linking} from 'react-native';
import toastMessageHelper from '../helpers/toast_message_helper';

const urlService = (() => {
  return {
    openUrl,
  }

  async function openUrl(url) {
    await Linking.canOpenURL(url).then(supported => {
      if (supported)
        Linking.openURL(url);
      else
        toastMessageHelper.showMessage(`មិនអាចបើកតំណនេះ: ${url}`)
    });
  }
})();

export default urlService;