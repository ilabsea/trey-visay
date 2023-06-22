import BaseModel from './BaseModel'
import uuidv4 from '../utils/uuidv4';
import jobClusters from '../data/json/job_clusters.json';
import Video from './Video'

const MODEL = 'JobCluster'

export default class JobCluster {
  static seedData = () => {
    jobClusters.map(jobCluster => {
      Video.seedData(jobCluster.videos)
      BaseModel.create(MODEL, {...jobCluster, uuid: uuidv4(), videos: this.getFomattedVideos(jobCluster.videos)}, 'modified')
    })
  }

  static getAll() {
    return [...BaseModel.getAll(MODEL)]
  }

  // private method
  static getFomattedVideos = (videos) => {
    let result = []
    videos.map(video => {
      result.push(video.id)
    })
    return result
  }
}