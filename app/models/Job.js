import BaseModel from './BaseModel'
import uuidv4 from '../utils/uuidv4';
import arrayUtil from '../utils/array_util';
import jobs from '../data/json/jobs.json';
import Video from './Video';

const MODEL = 'Job'

export default class Job {
  static seedData = () => {
    jobs.map((job) => {
      this.create(job)
    })
  }

  static create = (data) => {
    BaseModel.create(MODEL, this.getFormattedData(data), 'modified')
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

  static findByCode = (code) => {
    return BaseModel.findByAttr(MODEL, {code: `'${code}'`})[0]
  }

  static findAllByPersonalityTypes = (types) => {
    let jobs = []
    types.map(type => {
      jobs = [...jobs, ...BaseModel.containsByAttr(MODEL, 'personality_type', `'${type}'`)]
    })
    return arrayUtil.filterDuplicate(jobs, 'id')
  }

  static getVideosById = (jobId) => {
    const job = this.findById(jobId)
    if (!job) return []

    let videos = []
    job.videos.map(videoId => {
      const video = Video.findById(videoId)
      if (!!video)
        videos.push(video)
    })
    return videos
  }

  static deleteAll = () => {
    BaseModel.deleteAll(MODEL)
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
    const {logo, videos, name_km, name_en, ...data} = school
    return {...data, uuid: uuidv4(), logo: school.logo.url, videos: this.getFomattedVideos(school.videos)}
  }
}