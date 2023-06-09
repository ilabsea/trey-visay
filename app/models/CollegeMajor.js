import listMajors from '../data/json/list_majors';
import { containsAny } from '../utils/math';

export default class CollegeMajor {
  static findByCode = (code) => {
    return listMajors.filter(x => x.code == code)[0];
  }

  static findAllByCodes = (codes = []) => {
    return listMajors.filter(major => codes.includes(major.code))
  }

  static findAllByPersonalityTypes = (types = []) => {
    return listMajors.filter(major => containsAny(major.personality_type + '', types))
  }
}
