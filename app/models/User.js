import BaseModel from './BaseModel';
import realm from '../db/schema';
import uuidv4 from '../utils/uuidv4';

const MODEL = "User"

export default class User {
  static getAll = () => {
    return [...BaseModel.getAll(MODEL)];
  }

  static findByUuid = (uuid) => {
    return BaseModel.findByUuid(MODEL, uuid);
  }

  static create = (params) => {
    return realm.create(MODEL, {...params, uuid: uuidv4()});
  }

  static update = (uuid, params) => {
    BaseModel.update(MODEL, uuid, params);
  }

  static write = (callback) => {
    realm.write(() => {
      !!callback && callback();
    });
  }
}
