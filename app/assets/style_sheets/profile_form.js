import { StyleSheet , Platform} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  subTitle: {
    fontSize: 20,
  },
  inputContainer: {
    padding: 2,
    marginTop: 18,
    marginBottom: 18,
    maxWidth: 500
  },
  inputLabel: {
    fontSize: 16
  },
  errorText: {
    color: 'rgb(221,44,0)',
    fontSize: 12
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
  },
  link: {
    color: '#1976d2'
  },
  inlineBlock: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'row',
  },
  icon: {
    ...Platform.select({
      ios: {
        paddingTop: 0
      },
      android: {
        paddingTop: 20
      },
    })
  },
  textTime: {
    fontSize: 34,
    ...Platform.select({
      android: {
        lineHeight: 48
      }
    })
  }
});
