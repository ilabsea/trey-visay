import BaseModel from './BaseModel';
import uuidv4 from '../utils/uuidv4';
import realm from '../db/schema';

const MODEL = 'Visit';

export default class Visit {
  static create = (params) => {
    BaseModel.create(MODEL, {...params, uuid: uuidv4(), visit_date: new Date()})
  }

  static delete = (uuid) => {
    BaseModel.deleteByUuid(MODEL, uuid);
  }
}