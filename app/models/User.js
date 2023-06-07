import BaseModel from './BaseModel';
import realm from '../db/schema';
import uuidv4 from '../utils/uuidv4';
import Sidekiq from './Sidekiq';

const MODEL = "User"

export default class User {
  static getAll = () => {
    return realm.objects(MODEL);
  }

  static findByUuid = (uuid) => {
    return BaseModel.findByUuid(MODEL, uuid);
  }

  static create = (params) => {
    let user = realm.create(MODEL, {...params, uuid: uuidv4(), createdAt: new Date()});
    Sidekiq.create({paramUuid: user.uuid, modelName: 'uploadUser'});

    return user;
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
