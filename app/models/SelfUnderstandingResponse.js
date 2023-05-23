import BaseModel from './BaseModel';
import uuidv4 from '../utils/uuidv4';

const MODEL = "SelfUnderstandingResponse"

export default class SelfUnderstandingResponse {
  static getAll = () => {
    return [...BaseModel.getAll(MODEL)];
  }

  static findByUuid = (uuid) => {
    return BaseModel.findByUuid(MODEL, uuid);
  }

  static create = (params) => {
    BaseModel.create(MODEL, {...params, uuid: uuidv4()});
  }

  static update = (uuid, params) => {
    BaseModel.update(MODEL, uuid, params);
  }
}
