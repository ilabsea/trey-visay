'use strict';

export const colors = {
  red: "#FF0000"
}

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    flexDirection: 'column'
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  subTitle: {
    fontSize: 16
  }
});
