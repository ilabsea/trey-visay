import {ToastAndroid} from 'react-native';

const toastMessageHelper = (() => {
  return {
    showMessage
  }

  function showMessage(message) {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      90
    );
  }
})();

export default toastMessageHelper;