import BaseModel from './BaseModel'
import uuidv4 from '../utils/uuidv4';
import schools from '../data/json/schools.json';

const MODEL = 'School'

export default class School {
  static seedData = () => {
    schools.map((school) => {
      BaseModel.create(MODEL, this.getFormattedData(school), 'modified')
    })
  }

  static getAll = () => {
    return BaseModel.getAll(MODEL).sorted('name', true)
  }

  static findByCategory = (category) => {
    return BaseModel.findByAttr(MODEL, {category: `'${category}'`})
  }

  static create = (data) => {
    BaseModel.create(MODEL, this.getFormattedData(data), 'modified')
  }

  static update = (uuid, data) => {
    BaseModel.update(MODEL, uuid, this.getFormattedData(data))
  }

  static deleteAll = () => {
    BaseModel.deleteAll(MODEL)
  }

  // private method
  static getFormattedData(school) {
    return {
      uuid: uuidv4(),
      id: school.id.toString(),
      name: school.name,
      logo: JSON.stringify(school.logo),
      address: school.address,
      province: school.province,
      phone_numbers: school.phone_numbers,
      faxes: school.faxes,
      emails: school.emails,
      website: school.website_or_facebook,
      mailbox: school.mailbox,
      category: school.category,
      departments: JSON.stringify(school.departments)
    }
  }
}