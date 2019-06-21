import AsyncStorage from '@react-native-community/async-storage';
import universities from '../../data/json/universities';
import util from '../math';

export default class School {
  static setSelectedProvince(province, callback){
    AsyncStorage.setItem('SelectedProvince', province);
  }

  static getSelectedProvince(callback){
    AsyncStorage.getItem('SelectedProvince', (err, result) => {
      !!callback && callback(result);
    })
  }

  static setSelectedMajor(major){
    AsyncStorage.setItem('selectedMajor', major);
  }

  static getSelectedMajor(callback){
    AsyncStorage.getItem('selectedMajor', (err, result) => {
      !!callback && callback(result);
    })
  }

  static getSchools(options) {
    let uniList = util.sortByName(universities, 'universityName');
    if (!!options.category) {
      uniList = uniList.filter(school => school.category == options.category);
    }

    if (!!options.province) {
      uniList = uniList.filter(school => school.province == options.province);
    }

    if (!!options.major) {
      uniList = uniList.filter((school) => {
        let departments = school.departments.filter((department) => department.majors.includes(options.major));
        return !!departments.length;
      });
    }
    return uniList;
  }


  static clearSelectedValues(){
    this.setSelectedProvince('');
    this.setSelectedMajor('');
  }
}
