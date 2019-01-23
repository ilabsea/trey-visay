import { StyleSheet , Platform} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    color: '#fff',
    marginTop: 30,
    ...Platform.select({
      android: {
        lineHeight: 48
      },
    })
  },
  subTitle: {
    fontSize: 24,
    color: '#fff',
    marginVertical: 30,
  },
  inputText: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40
  },
  whiteLabel: {
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  linkText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold'
  },
  submitText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff'
  },
  btnLogin: {
    marginTop: 24,
  },
  submitWrapper: {
    marginTop: 24
  },
  iconWrapper: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#1976d2',
    position: 'absolute',
    right: 16,
    top: 16
  },
  btnSubmit: {
    borderRadius: 3,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16
  }
})
