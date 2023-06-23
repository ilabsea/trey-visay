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
    return [...BaseModel.getAll(MODEL)]
  }

  static create = (data) => {
    BaseModel.create(MODEL, {...data, uuid: uuidv4()})
  }

  static findById = (id) => {
    return BaseModel.findByAttr(MODEL, {id: `'${id}'`})[0]
  }

  static findAllByName = (name) => {
    return arrayUtil.filterDuplicate(BaseModel.containsByAttr(MODEL, 'name', `'${name}'`), 'id')
  }

  static deleteAll = () => {
    BaseModel.deleteAll(MODEL)
  }
}