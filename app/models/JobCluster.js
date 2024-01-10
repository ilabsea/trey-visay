import BaseModel from './BaseModel'
import uuidv4 from '../utils/uuidv4';
import jobClusters from '../data/json/job_clusters.json';

const MODEL = 'JobCluster'

export default class JobCluster {
  static seedData = () => {
    jobClusters.map(jobCluster => {
      this.create(jobCluster);
    })
  }

  static getAll() {
    return [...BaseModel.getAll(MODEL).sorted('display_order', false)]
  }

  static findById(id) {
    return BaseModel.findByAttr(MODEL, {id: `'${id}'`})[0];
  }

  static getLastUpdatedAt = () => {
    return BaseModel.getLastUpdatedAt(MODEL);
  }

  static create(data) {
    BaseModel.create(MODEL, {...data, uuid: uuidv4(), logo: data.logo.url, video_ids: this.getFormattedVideoIds(data.videos), display_order: this.getAll().length + 1}, 'modified')
  }

  static update(uuid, data) {
    BaseModel.update(MODEL, uuid, {...data, logo: data.logo.url, video_ids: this.getFormattedVideoIds(data.videos)})
  }

  static deleteByUuid = (uuid) => {
    BaseModel.deleteByUuid(MODEL, uuid);
  }

  // private method
  static getFormattedVideoIds = (videos) => {
    return videos.map(video => video.id)
  }
}
