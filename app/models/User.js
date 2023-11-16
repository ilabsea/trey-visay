import BaseModel from './BaseModel';
import realm from '../db/schema';
import randomId from '../utils/id_util';

const MODEL = "User"

export default class User {
  static getAll = () => {
    return realm.objects(MODEL);
  }

  static findByUuid = (uuid) => {
    return BaseModel.findByUuid(MODEL, uuid);
  }

  static create = (params) => {
    return realm.create(MODEL, {...params, uuid: randomId(), createdAt: new Date()});
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
