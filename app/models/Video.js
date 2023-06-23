import BaseModel from './BaseModel'
import uuidv4 from '../utils/uuidv4';
import videos from '../data/json/videos.json';

const MODEL = 'Video'

export default class Video {
  static seedData = () => {
    videos.map(video => {
      if (!this.findById(video.id))
        this.create(video)
    })
  }

  static getAll = () => {
    return BaseModel.getAll()
  }

  static create = (data) => {
    BaseModel.create(MODEL, {...data, uuid: uuidv4()})
  }

  static findById = (id) => {
    return BaseModel.findByAttr(MODEL, {id: `'${id}'`})[0]
  }
}