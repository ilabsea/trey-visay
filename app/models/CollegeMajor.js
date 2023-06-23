import BaseModel from './BaseModel'
import uuidv4 from '../utils/uuidv4';
import arrayUtil from '../utils/array_util';
import collegeMajors from '../data/json/college_majors.json';

const MODEL = 'CollegeMajor'

export default class CollegeMajor {
  static seedData = () => {
    collegeMajors.map((collegeMajor) => {
      this.create(collegeMajor)
    })
  }

  static getAll = () => {
    return BaseModel.getAll(MODEL)
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

  static findAllByPersonalityTypes = (types) => {
    let majors = []
    types.map(type => {
      majors = [...majors, ...BaseModel.containsByAttr(MODEL, 'personality_type', `'${type}'`)]
    })
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