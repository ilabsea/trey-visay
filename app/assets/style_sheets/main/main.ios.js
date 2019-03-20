import { StyleSheet , Platform } from 'react-native';
import { FontSetting } from '../font_setting';

export const mainStyles = StyleSheet.create({
  btnList: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16
  },
  text: {
    flex: 1 ,
    fontSize: FontSetting.text
  },
  box: {
    marginBottom: 8,
    padding: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d3d3d3',
  },
  sectionText: {
    fontWeight: 'bold',
    fontSize: FontSetting.text,
    marginTop: 16,
    marginLeft: 16
  }
})
