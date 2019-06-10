// totalCount is totalEntries
// pageCount is total items in the current page
import {
  AsyncStorage
} from 'react-native';
import { random, min, times } from 'lodash';
import universities from '../data/json/universities';
import util from '../utils/math';

const perPage = 15;

export default class API {
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

  static getSchools(page, option={}) {
    return new Promise(resolve => {
      setTimeout(() => {
        let list = util.sortByName(universities, 'universityName');
        if (!!option.category) {
          list = list.filter(school => school.category == option.category);
        }

        if (!!option.province) {
          list = list.filter(school => school.province == option.province);
        }

        if (!!option.major) {
          list = list.filter((school) => {
            let departments = school.departments.filter((department) => department.majors.includes(option.major));
            return !!departments.length;
          });
        }

        const totalCount = list.length;
        const pageCount = min([totalCount - (page - 1) * perPage, perPage]);
        const pagination = { page, perPage, pageCount, totalCount };

        let offset = (page - 1) * perPage;
        let endPoint = page * perPage;
        let provinces = [...new Set(list.map(school => school.province))];
        const records = list.slice(offset, endPoint);

        resolve({ pagination, records, provinces });
      }, 10)
    })
  }

  static getProvinces(category) {
    return new Promise(resolve => {
      let list = universities;
      if (!!category) {
        list = list.filter(school => school.category == category);
      }

      let provinces = [...new Set(list.map(school => school.province))];
      provinces = provinces.filter(v => v);
      provinces.sort();
      resolve({ provinces });
    })
  }

  static clearSelectedValues(){
    this.setSelectedProvince('');
    this.setSelectedMajor('');
  }
}
