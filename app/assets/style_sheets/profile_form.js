import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputText: {
    height: 40,
    paddingLeft: 5,
    paddingRight: 5,
    maxWidth: 500
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  inputContainer: {
    padding: 2,
    marginTop: 18,
    marginBottom: 18,
    maxWidth: 500
  },
  errorText: {
    color: 'rgb(221,44,0)',
    fontSize: 12,
    lineHeight: 14
  },
  saveText: {
    color: '#fff',
    marginLeft: 10,
    marginRight: 16,
    fontSize: 16,
    fontWeight: 'bold',
  },
  box: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 16,
    backgroundColor: '#fff'
  },
  listItem: {
    fontSize: 20,
    flex: 1
  }
});
