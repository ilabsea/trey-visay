import BaseModel from './BaseModel'
import uuidv4 from '../utils/uuidv4';
import schools from '../data/json/schools.json';
import realm from '../db/schema';

const MODEL = 'School'

export default class School {
  static seedData = () => {
    schools.map((school) => {
      BaseModel.create(MODEL, this.getFormattedData(school), 'modified')
    })
  }

  static getAll = () => {
    return BaseModel.getAll(MODEL).sorted('id', false)
  }

  static findByCategory = (category) => {
    return BaseModel.findByAttr(MODEL, {category: `'${category}'`})
  }

  static findByKind = (kind) => {
    return BaseModel.findByAttr(MODEL, {kind: `'${kind}'`})
  }

  static findById = (id) => {
    return BaseModel.findByAttr(MODEL, {id: parseInt(id)})[0]
  }

  static create = (data) => {
    BaseModel.create(MODEL, this.getFormattedData(data), 'modified')
  }

  static update = (uuid, data) => {
    BaseModel.update(MODEL, uuid, this.getFormattedData(data))
  }

  static findAllByIds = (ids) => {
    return realm.objects('School').filtered('id IN $0', Object.values(ids));
  }

  static deleteAll = () => {
    BaseModel.deleteAll(MODEL)
  }

  // private method
  static getFormattedData(school) {
    return {
      uuid: uuidv4(),
      id: parseInt(school.id),
      name: school.name,
      logo: school.logo.url,
      address: school.address,
      province: school.province,
      phone_numbers: school.phone_numbers,
      faxes: school.faxes,
      emails: school.emails,
      website: school.website_or_facebook,
      mailbox: school.mailbox,
      category: school.category,
      departments: JSON.stringify(school.departments),
      kind: school.kind,
    }
  }
}