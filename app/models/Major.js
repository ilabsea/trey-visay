import BaseModel from './BaseModel'
import uuidv4 from '../utils/uuidv4';
import arrayUtil from '../utils/array_util';
import majors from '../data/json/majors.json';

const MODEL = 'Major'

export default class Major {
  static seedData = () => {
    majors.map((major) => {
      this.create(major)
    })
  }

  static getAll = () => {
    return BaseModel.getAll(MODEL)
  }

  static findById = (id) => {
    return BaseModel.findByAttr(MODEL, {id: id})[0];
  }

  static findByCode = (code) => {
    return BaseModel.findByAttr(MODEL, {code: `'${code}'`})[0]
  }

  static findAllByCodes = (codes) => {
    let majors = []
    codes.map(code => {
      majors = [...majors, ...BaseModel.findByAttr(MODEL, {code: `'${code}'`})]
    })
    return majors
  }

  static findAllParentByGradeAndPersonalityTypes = (grade, otherGrade, types) => {
    let majors = []
    types.map(type => {
      majors = [...majors, ...BaseModel.beginsWith(MODEL, 'personality_type', `'${type}'`)]
    })
    majors = majors.filter(major => !major.parent_code);
    // vocational grade major will not be shown if the user's grade is higher than 9 or university student
    if (grade > 9 || (grade == 'other' && otherGrade == 'university_student'))
      majors = majors.filter(major => major.grade != 'vocational_grade');

    return arrayUtil.filterDuplicate(majors, 'id')
  }

  static create = (data) => {
    BaseModel.create(MODEL, {...data, uuid: uuidv4(), school_ids: this.getFomattedSchoolIds(data.schools)}, 'modified')
  }

  static deleteAll = () => {
    BaseModel.deleteAll(MODEL)
  }

  // private method
  static getFomattedSchoolIds = (schools) => {
    return schools.map(school => school.id)
  }
}