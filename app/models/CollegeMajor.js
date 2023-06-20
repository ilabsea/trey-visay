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
      BaseModel.create(MODEL, {...collegeMajor, uuid: uuidv4()}, 'modified')
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
}