import BaseModel from './BaseModel';
import uuidv4 from '../utils/uuidv4';

const MODEL = "Quiz"

export default class Quiz {
  static getAll = () => {
    return [...BaseModel.getAll(MODEL)];
  }

  static findByUuid = (uuid) => {
    return BaseModel.findByUuid(MODEL, uuid);
  }

  static create = (params) => {
    uuid = uuidv4();
    BaseModel.create(MODEL, {...params, createdAt: new Date(), uuid: uuid});

    return uuid;
  }

  static update = (uuid, params) => {
    BaseModel.update(MODEL, uuid, params);
  }
}
