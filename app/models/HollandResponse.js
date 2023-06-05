import BaseModel from './BaseModel';
import uuidv4 from '../utils/uuidv4';
import realm from '../db/schema';

const MODEL = "HollandResponse"

export default class HollandResponse {
  static getAll = () => {
    return [...BaseModel.getAll(MODEL)];
  }

  static getAllByQuiz = (quizUuid) => {
    return realm.objects(MODEL).filtered(`quizUuid = '${quizUuid}'`);
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
