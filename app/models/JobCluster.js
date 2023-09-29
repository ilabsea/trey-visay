import BaseModel from './BaseModel'
import uuidv4 from '../utils/uuidv4';
import jobClusters from '../data/json/job_clusters.json';

const MODEL = 'JobCluster'

export default class JobCluster {
  static seedData = () => {
    jobClusters.map(jobCluster => {
      const displayOrder = !!jobCluster.display_order ? parseInt(jobCluster.display_order) : this.getAll().length + 1;
      BaseModel.create(MODEL, {...jobCluster, uuid: uuidv4(), video_ids: this.getFomattedVideoIds(jobCluster.videos), display_order: displayOrder}, 'modified')
    })
  }

  static getAll() {
    return [...BaseModel.getAll(MODEL).sorted('display_order', false)]
  }

  // private method
  static getFomattedVideoIds = (videos) => {
    return videos.map(video => video.id)
  }
}