import BaseModel from './BaseModel';
import uuidv4 from '../utils/uuidv4';
import realm from '../db/schema';

const MODEL = "Quiz"

export default class Quiz {
  static getAll = () => {
    return [...BaseModel.getAll(MODEL)];
  }

  static findByUuid = (uuid) => {
    return BaseModel.findByUuid(MODEL, uuid);
  }

  static create = (params) => {
    return realm.create(MODEL, {...params, createdAt: new Date(), uuid: uuidv4()});
  }

  static update = (uuid, params) => {
    return realm.create(MODEL, Object.assign(params, { uuid: uuid }), 'modified');
  }

  static write = (callback) => {
    realm.write(() => {
      !!callback && callback();
    });
  }
}
