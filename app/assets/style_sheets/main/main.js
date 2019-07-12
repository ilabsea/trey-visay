import { StyleSheet , Platform } from 'react-native';
import { FontSetting } from '../font_setting';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  btnList: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16
  },
  title: {
    flex: 1 ,
    fontSize: FontSetting.title,
  },
  text: {
    flex: 1,
    fontSize: FontSetting.text
  },
  subTitle:{
    fontSize: FontSetting.sub_title
  },
  box: {
    marginBottom: 8,
    padding: 0,
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#d3d3d3',
  },
  sectionText: {
    fontWeight: 'bold',
    fontSize: FontSetting.text,
    marginLeft: 20,
    marginTop: 16
  },
  sectionTextInBox: {
    fontSize: FontSetting.title,
    fontWeight: 'bold'
  },
  instructionContainer: {
    flexDirection: 'row',
    marginTop: 24,
    marginLeft: 16,
    marginBottom: 8,
    flex: 1
  },
  instructionText: {
    fontSize: FontSetting.text,
    marginLeft: 16,
    marginBottom: 8
  },
  link: {
    color: '#1976d2',
    fontSize: FontSetting.text,
  },
  carouselBox: {
    marginBottom: 20,
    backgroundColor: 'white'
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: 20
  },
  blueTitleBox: {
    backgroundColor: 'rgba(24, 118, 211, 0.2)',
    height: 64,
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    width: '90%',
    margin: 20,
    marginBottom: 0,
    flexDirection: 'row',
    paddingLeft: 16
  },
  subTitleBox: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '90%',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 16,
    marginHorizontal: 20,
  },
  curveBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingLeft: 16,
    margin: 20,
    justifyContent: 'center',
    marginBottom: 0
  },
  thumnailList: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingRight: 17,
    marginBottom: 20,
    overflow: 'hidden'
  },
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(25, 118, 210, 0.9)',
    top: 0,
    bottom: 0,
    left:0,
    right: 0,
  }
})
