import BaseModel from './BaseModel'
import uuidv4 from '../utils/uuidv4';
import highSchools from '../data/json/address/highSchools';

const MODEL = 'HighSchool';

export default class HighSchool {
  static seedData = () => {
    highSchools.map(item => {
      this.create(item)
    });
  }

  static getAll = () => {
    return [...BaseModel.getAll(MODEL)];
  }

  static getLastUpdatedAt = () => {
    return BaseModel.getLastUpdatedAt(MODEL);
  }

  static findById = (id) => {
    return BaseModel.findByAttr(MODEL, {id: `'${id}'`})[0];
  }

  static create = (data) => {
    BaseModel.create(MODEL, this._buildParams(data));
  }

  static update = (uuid, data) => {
    BaseModel.update(MODEL, uuid, data);
  }

  static deleteAll = () => {
    BaseModel.deleteAll(MODEL);
  }

  static deleteByUuid = (uuid) => {
    BaseModel.deleteByUuid(MODEL, uuid);
  }

  // private method
  static _buildParams = (data) => {
    return { ...data, id: data.code, uuid: data.code }
  }
}
