// @flow

import variable from './../variables/platform';
import { Platform } from "react-native";

export default (variables /*: * */ = variable) => {
  const inputTheme = {
    '.multiline': {
      height: null,
    },
    height: variables.inputHeightBase,
    color: variables.inputColor,
    paddingLeft: 5,
    paddingRight: 5,
    flex: 1,
    fontSize: variables.inputFontSize,
    fontFamily: Platform.OS === "ios" ? 'HelveticaNeue' : 'Kantumruy'
  };

  return inputTheme;
};
