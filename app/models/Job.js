import BaseModel from './BaseModel'
import uuidv4 from '../utils/uuidv4';
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