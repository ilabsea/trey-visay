import { StyleSheet , Platform} from 'react-native';

export default StyleSheet.create({
  container: {
    ...Platform.select({
      android: {
        margin: 16
      },
      ios: {
        margin: 8
      }
    })
  },
  box: {
    backgroundColor: '#fff',
    padding: 24,
  },
  title: {
    fontSize: 24,
    color: '#1976d2',
    ...Platform.select({
      android: {
        lineHeight: 48
      }
    })
  },
  logoWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 20,
  },
  logo: {
    width: 60,
    height: 60
  },
  text: {
    fontWeight: 'bold'
  }
})
