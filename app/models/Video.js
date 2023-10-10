import BaseModel from './BaseModel'
import uuidv4 from '../utils/uuidv4';
import videos from '../data/json/videos.json';
import arrayUtil from '../utils/array_util';

const MODEL = 'Video'

export default class Video {
  static seedData = () => {
    videos.map(video => {
      if (!this.findById(video.id))
        this.create(video)
    })
  }

  static getAll = () => {
    return [...BaseModel.getAll(MODEL).sorted('updated_at', true)];
  }

  static create = (data) => {
    BaseModel.create(MODEL, {...data, uuid: uuidv4()})
  }

  static update = (uuid, data) => {
    BaseModel.update(MODEL, uuid, data);
  }

  static findById = (id) => {
    return BaseModel.findByAttr(MODEL, {id: `'${id}'`})[0]
  }

  static findAllByName = (name) => {
    return arrayUtil.filterDuplicate(BaseModel.containsByAttr(MODEL, 'name', `'${name}'`).sorted('updated_at', true), 'id')
  }

  static deleteAll = () => {
    BaseModel.deleteAll(MODEL)
  }

  static deleteByUuid = (uuid) => {
    BaseModel.deleteByUuid(MODEL, uuid);
  }
}