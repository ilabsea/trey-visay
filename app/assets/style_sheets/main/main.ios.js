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
    fontSize: FontSetting.title
  },
  text: {
    fontSize: FontSetting.text
  },
  subTitle:{
    fontSize: FontSetting.sub_title
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
  },
  sectionTextInBox: {
    fontSize: FontSetting.text,
    marginTop: 16,
    marginLeft: 16
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
    height: 26
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
  }
})
