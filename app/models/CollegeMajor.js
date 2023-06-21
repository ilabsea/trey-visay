// import listMajors from '../data/json/list_majors';
// import { containsAny } from '../utils/math';

// export default class CollegeMajor {
//   static findByCode = (code) => {
//     return listMajors.filter(x => x.code == code)[0];
//   }

//   static findAllByCodes = (codes = []) => {
//     return listMajors.filter(major => codes.includes(major.code))
//   }

//   static findAllByPersonalityTypes = (types = []) => {
//     return listMajors.filter(major => containsAny(major.personality_type + '', types))
//   }
// }

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

  static findByCodes = (codes) => {
    let result = []
    codes.maps(code => {
      result = [...result, ...BaseModel.findByAttr(MODEL, {code: `'${code}'`})]
    })
    return result
  }

  static findAllByPersonalityTypes = (types) => {
    let result = []
    types.maps(type => {
      result = [...result, ...BaseModel.findByAttr(MODEL, {personality_type: `'${type}'`})]
    })
    return result
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
}