import BaseModel from './BaseModel'
import uuidv4 from '../utils/uuidv4';
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
    return this.filterDuplicate(majors)
  }

  static create = (data) => {
    BaseModel.create(MODEL, {...data, uuid: uuidv4(), schools: this.getFomattedSchools(data.schools)}, 'modified')
  }

  static deleteAll = () => {
    BaseModel.deleteAll(MODEL)
  }

  // private method
  static getFomattedSchools = (schools) => {
    let result = []
    schools.map(school => {
      result.push(school.id)
    })
    return result
  }

  static filterDuplicate = (majors) => {
    const result = majors.reduce((prevArr, current) => {
      if (prevArr.filter(item => item.id === current.id).length == 0)
        prevArr.push(current);

      return prevArr;
    }, []);
    return result
  }
}