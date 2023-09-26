import SchoolModel from '../models/School';
import provinceList from '../data/json/address/provinces.json';

const PER_PAGE = 20;

export default class SchoolUtil {
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

  static getMajors(selectedProvince, category, department) {
    const schools = SchoolModel.getAll().filter(school => {
      if (!!selectedProvince && selectedProvince != '0') {
        if (!!category && category != '0')
          return school.province == selectedProvince && school.category == category;

        return school.province == selectedProvince;
      }
      return (!!category && category != '0') ? school.category == category : school;
    });

    let majors = []
    let departments = []

    schools.map(school => {
      const schoolDepartments = JSON.parse(school.departments)
      departments = [...departments, ...((!!department && department != '0') ? schoolDepartments.filter(item => item.name == department)  : schoolDepartments)]
    })

    departments.map(department => {
      majors = [...majors, ...department.majors]
    })
    return [...new Map(majors.map((major) => [major.id, major])).values()];    // filter duplicate major by ID
  }

  static getSchoolNamesByIds(schoolIds) {
    if (!schoolIds) return ''

    const schools = SchoolModel.findAllByIds(schoolIds);
    return schools.map(school => `- ${school.name}`).join("")
  }

  static getTvetDepartments(province) {
    let tvetDepartments = []
    const schools = (!!province && province != '0') ? SchoolModel.findByKindAndProvince('tvet_institute', province) : SchoolModel.findByKind('tvet_institute');
    schools.map(school => {
      tvetDepartments = [...tvetDepartments, ...JSON.parse(school.departments).map(department => department.name)]
    });
    return [...new Set(tvetDepartments)]
  }

  static getProvincesForPicker(kind) {
    const schools = !!kind ? [...SchoolModel.findByKind(kind)] : [...SchoolModel.getAll()]
    const provinces = [...new Set(schools.map(school => { return provinceList.filter(province => province.code == parseInt(school.province))[0]}))];
    if (!provinces[0])  // return only default item if all the schools have province as null
      return [{ code: '0', label: 'គ្រប់គ្រឹះស្ថានសិក្សា' }]

    provinces.sort();
    return [{ code: '0', label: 'គ្រប់គ្រឹះស្ថានសិក្សា' }, ...provinces]
  }

  static getDepartmentsForPicker(province) {
    return [{ code: '0', label: 'គ្រប់កម្រិត' }, ...this.getTvetDepartments(province).map((item) => ({code: item, label: item}))];
  }

  static getMajorsForPicker(province, category, department) {
    return [{code: '0', label: 'គ្រប់ជំនាញ'}, ...this.getMajors(province, category, department).map((item) => ({code: item.id, label: item.name}))];
  }
}
