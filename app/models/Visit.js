import BaseModel from './BaseModel';
import realm from '../db/schema';

const MODEL = 'Visit';

export default class Visit {
  static findByUuid = (uuid) => {
    return BaseModel.findByUuid(MODEL, uuid)
  }

  static create = (params) => {
    realm.create(MODEL, {...params, visit_date: new Date()})
  }

  static delete = (uuid) => {
    BaseModel.deleteByUuid(MODEL, uuid);
  }

  static write = (callback) => {
    realm.write(() => {
      !!callback && callback();
    });
  }
}