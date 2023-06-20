import AsyncStorage from '@react-native-async-storage/async-storage';
import SchoolModel from '../models/School';

const PER_PAGE = 20;

export default class SchoolUtil {
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
    let uniList = SchoolModel.getAll()
    if (!!options.kind)
      uniList = uniList.filter(school => school.kind == options.kind);

    if (!!options.province)
      uniList = uniList.filter(school => school.province == options.province);

    if (!!options.major) {
      uniList = uniList.filter((school) => {
        let departments = JSON.parse(school.departments).filter((department) => department.majors.includes(options.major));
        return !!departments.length;
      });
    }

    let page = options.page || 1;
    let start = (page - 1) * PER_PAGE;
    let end = page * PER_PAGE;

    return uniList.slice(start, end);
  }

  static getProvinces(kind) {
    const schools = !!kind ? SchoolModel.findByKind(kind) : SchoolModel.getAll()
    let provinces = [...new Set(schools.map(school => school.province))];
    provinces = provinces.filter(v => v);
    provinces.sort();
    return provinces;
  }

  static getMajors(selectedProvince, category) {
    const schools = SchoolModel.getAll()
    let majors = []
    let departments = []
    schools.map(school => {
      if(school.province == selectedProvince && school.category == category)
        departments = [...departments, ...JSON.parse(school.departments)]
      else if (school.category == category)
        departments = [...departments, ...JSON.parse(school.departments)]
    })

    departments.map(department => {
      majors = [...majors, ...department.majors]
    })
    return [...new Set(majors)]
  }

  static clearSelectedValues(){
    this.setSelectedProvince('');
    this.setSelectedMajor('');
  }
}
