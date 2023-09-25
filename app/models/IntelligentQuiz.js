import BaseModel from './BaseModel';
import uuidv4 from '../utils/uuidv4';
import realm from '../db/schema';

const MODEL = "IntelligentQuiz";

export default class IntelligentQuiz {
  static getAll = () => {
    return [...BaseModel.getAll(MODEL)];
  }

  static findByUuid = (uuid) => {
    return BaseModel.findByUuid(MODEL, uuid);
  }

  static findAllByUser = (userUuid) => {
    return realm.objects(MODEL).filtered(`userUuid = '${userUuid}' AND finishedAt != null`);
  }

  static create = (params) => {
    return realm.create(MODEL, {...params, createdAt: new Date(), uuid: uuidv4()});
  }

  static update = (uuid, params) => {
    return realm.create(MODEL, Object.assign(params, { uuid: uuid }), 'modified');
  }

  static getUnDone = (userUuid) => {
    let quizzes = realm.objects(MODEL).filtered(`userUuid = '${userUuid}' AND finishedAt = null`).sorted('createdAt', true);

    return quizzes[quizzes.length - 1];
  }

  static delete = (uuid) => {
    const item = this.findByUuid(uuid);
    if (!!item)
      realm.delete(item);
  }

  static write = (callback) => {
    realm.write(() => {
      !!callback && callback();
    });
  }
}