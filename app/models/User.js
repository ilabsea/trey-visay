import BaseModel from './BaseModel';

const MODEL = "User"

export default class User {
  static getAll = () => {
    return [...BaseModel.getAll(MODEL)];
  }

  static findByUuid = (uuid) => {
    return BaseModel.findByUuid(MODEL, uuid);
  }

  static create = (params) => {
    BaseModel.create(MODEL, params);
  }

  static update = (uuid, params) => {
    BaseModel.update(MODEL, uuid, params);
  }
}
