import BaseModel from './BaseModel'
import uuidv4 from '../utils/uuidv4';
import jobClusters from '../data/json/job_clusters.json';

const MODEL = 'JobCluster'

export default class JobCluster {
  static seedData = () => {
    jobClusters.map(jobCluster => {
      this.create(jobCluster);
      // const displayOrder = !!jobCluster.display_order ? parseInt(jobCluster.display_order) : this.getAll().length + 1;
      // BaseModel.create(MODEL, {...jobCluster, uuid: uuidv4(), video_ids: this.getFormattedVideoIds(jobCluster.videos), display_order: displayOrder}, 'modified')
    })
  }

  static getAll() {
    return [...BaseModel.getAll(MODEL).sorted('display_order', false)]
  }

  static findById(id) {
    return BaseModel.findByAttr(MODEL, {id: `'${id}'`})[0];
  }

  static create(data) {
    BaseModel.create(MODEL, {...data, uuid: uuidv4(), video_ids: this.getFormattedVideoIds(data.videos), display_order: this.getAll().length + 1}, 'modified')
  }

  static update(uuid, data) {
    BaseModel.update(MODEL, uuid, {...data, video_ids: this.getFormattedVideoIds(data.videos)})
  }

  static deleteByUuid = () => {
    BaseModel.deleteByUuid(MODEL, uuid);
  }

  // private method
  static getFormattedVideoIds = (videos) => {
    return videos.map(video => video.id)
  }
}