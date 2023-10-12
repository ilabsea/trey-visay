import BaseModel from './BaseModel'
import uuidv4 from '../utils/uuidv4';
import careerWebsites from '../data/json/career_websites';

const MODEL = 'CareerWebsite';

export default class CareerWebsite {
  static seedData = () => {
    careerWebsites.map(item => {
      BaseModel.create(MODEL, this._buildParams(item));
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
    BaseModel.update(MODEL, uuid, {...data, logo: data.logo_url});
  }

  static deleteAll = () => {
    BaseModel.deleteAll(MODEL);
  }

  static deleteByUuid = () => {
    BaseModel.deleteByUuid(MODEL, uuid);
  }

  // private method
  static _buildParams = (data) => {
    return {...data, uuid: uuidv4(), logo: data.logo_url}
  }
}