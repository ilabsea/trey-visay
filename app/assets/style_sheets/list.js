// https://stackoverflow.com/questions/40441877/react-native-bulleted-lists-using-flex-wrap?rq=1

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  column: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      paddingHorizontal: 16
  },
  row: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      flex: 1
  },
  bullet: {
      width: 20
  },
  bulletText: {
      flex: 1
  },
});
