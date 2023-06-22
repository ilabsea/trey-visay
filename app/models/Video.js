import BaseModel from './BaseModel'
import uuidv4 from '../utils/uuidv4';

const MODEL = 'Video'

export default class Video {
  static create = (data) => {
    BaseModel.create(MODEL, {data, uuid: uuidv4()}, 'modified')
  }

  static findById = (id) => {
    return BaseModel.findByAttr(MODEL, {id: `'${id}'`})
  }
}