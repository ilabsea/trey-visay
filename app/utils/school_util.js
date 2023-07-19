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

  static setSelectedCategory(category) {
    AsyncStorage.setItem('selectedCategory', category);
  }

  static getSelectedCategory(callback){
    AsyncStorage.getItem('selectedCategory', (err, result) => {
      !!callback && callback(result);
    })
  }

  static setSelectedDepartment(department) {
    AsyncStorage.setItem('selectedDepartment', department);
  }

  static getSelectedDepartment(callback){
    AsyncStorage.getItem('selectedDepartment', (err, result) => {
      !!callback && callback(result);
    })
  }

  static getSchools(options) {
    let uniList = SchoolModel.getAll()
    if (!!options.kind)
      uniList = uniList.filter(school => school.kind == options.kind);

    if (!!options.province)
      uniList = uniList.filter(school => school.province == options.province);

    if (!!options.department) {
      uniList = uniList.filter((school) => {
        let departments = JSON.parse(school.departments).filter((department) => department.name == options.department);
        return !!departments.length;
      });
    }

    if (!!options.major) {
      uniList = uniList.filter((school) => {
        let departments = JSON.parse(school.departments).filter((department) => department.majors.includes(options.major));
        return !!departments.length;
      });
    }

    if (!!options.category)
      uniList = uniList.filter(school => school.category == options.category);

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
    this.setSelectedCategory('');
    this.setSelectedDepartment('');
  }

  static getSchoolNamesByIds(schoolIds) {
    if (!schoolIds) return ''

    const schools = SchoolModel.findAllByIds(schoolIds);
    return schools.map(school => `- ${school.name}`).join("")
  }

  static getTvetDepartments() {
    let tvetDepartments = []
    SchoolModel.findByKind('tvet_institute').map(school => {
      tvetDepartments = [...tvetDepartments, ...JSON.parse(school.departments).map(department => department.name)]
    });
    return [...new Set(tvetDepartments)]
  }
}
