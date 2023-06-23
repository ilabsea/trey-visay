import BaseModel from './BaseModel'
import uuidv4 from '../utils/uuidv4';
import jobClusters from '../data/json/job_clusters.json';
import Video from './Video'

const MODEL = 'JobCluster'

export default class JobCluster {
  static seedData = () => {
    jobClusters.map(jobCluster => {
      Video.seedData(jobCluster.videos)
      BaseModel.create(MODEL, {...jobCluster, uuid: uuidv4(), video_ids: this.getFomattedVideoIds(jobCluster.videos)}, 'modified')
    })
  }

  static getAll() {
    return [...BaseModel.getAll(MODEL)]
  }

  // private method
  static getFomattedVideoIds = (videos) => {
    return videos.map(video => video.id)
  }
}