import { StyleSheet , Platform} from 'react-native';
import RF from "react-native-responsive-fontsize"

export default StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      android: {
        margin: 16
      },
      ios: {
        margin: 8
      }
    })
  },
  subTitle: {
    ...Platform.select({
      android: {
        fontSize: 20
      },
      ios: {
        fontSize: RF(2.5)
      }
    })
  },
  inputContainer: {
    padding: 2,
    marginTop: 30,
    marginBottom: 18,
    maxWidth: 500
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
    marginBottom: 8,
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
    flexDirection:'row'
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
  },
  dialogButtonText: {
    ...Platform.select({
      android: {
        lineHeight: 18
      }
    })
  },
  labelColor: {
    color: 'black'
  }
});
