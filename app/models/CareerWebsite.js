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
    return BaseModel.getAll(MODEL);
  }

  static create = (data) => {
    BaseModel.create(MODEL, this._buildParams(data));
  }

  // private method
  static _buildParams = (data) => {
    return {...data, uuid: uuidv4(), logo: data.logo.url}
  }
}