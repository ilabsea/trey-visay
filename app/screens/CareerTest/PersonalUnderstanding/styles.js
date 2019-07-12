import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  scrollContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  buttonText: {
    fontSize: 18,
    color: 'black'
  },
  subTitle: {
    fontSize: 20,
    textAlign: 'center'
  },
  paragraph: {
    marginVertical: 10
  },
  button: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left:0,
    right: 0,
  }
});
