import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  tabTitleWrapper: {
    flexDirection: 'row',
    height: 54,
    alignItems: 'center',
    backgroundColor: 'rgba(155, 155, 155, 0.11)'
  },
  tabtitleText: {
    fontSize: 17,
    color: 'rgb(155, 155, 155)'
  },
  leftBar: {
    borderLeftWidth: 1,
    borderLeftColor: 'rgb(151, 151, 151)'
  },
  activeText: {
    color: '#000'
  },
  textInput: {
    marginTop: 18
  },
  agreementTerm: {
    fontSize: 12,
    lineHeight: 16,
    color: 'rgb(111, 123, 135)'
  },
  note: {
    marginTop: 24,
    paddingHorizontal: 30,
  }
})
