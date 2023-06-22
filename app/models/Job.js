// import listJobs from '../data/json/list_jobs';
// import { containsAny } from '../utils/math';

// export default class Job {
//   static findByCode = (code) => {
//     return listJobs.filter(x => x.code == code)[0];
//   }

//   static findAllByCodes = (codes = []) => {
//     return listJobs.filter(job => codes.includes(job.code))
//   }

//   static findAllByPersonalityTypes = (types = []) => {
//     return listJobs.filter(job => containsAny(job.personality_type + '', types))
//   }
// }


import BaseModel from './BaseModel'
import uuidv4 from '../utils/uuidv4';
import jobs from '../data/json/jobs.json';

const MODEL = 'Job'

export default class Job {
  static seedData = () => {
    jobs.map((job) => {
      BaseModel.create(MODEL, this.getFormattedData(job), 'modified')
    })
  }

  static getAll = () => {
    return BaseModel.getAll(MODEL)
  }

  static findAllByJobCluster = (jobClusterId) => {
    return [...BaseModel.findByAttr(MODEL, { job_cluster_id: `'${jobClusterId}'` })]
  }

  static findById = (id) => {
    return BaseModel.findByAttr(MODEL, { id: `'${id}'` })[0]
  }

  // private method
  static getFomattedVideos = (videos) => {
    let result = []
    videos.map(video => {
      result.push(video.id)
    })
    return result
  }

  static getFormattedData(school) {
    let {logo, videos, name_km, name_en, ...data} = school
    // data = {...data, uuid: uuidv4(), logo: school.logo.url, videos: this.getFomattedVideos(school.videos)}
    return {...data, uuid: uuidv4(), logo: school.logo.url, videos: this.getFomattedVideos(school.videos)}
  }
}