import BaseModel from './BaseModel'
import uuidv4 from '../utils/uuidv4';
import arrayUtil from '../utils/array_util';
import jobs from '../data/json/jobs.json';
import realm from '../db/schema';

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
    if(!code) return null;

    return BaseModel.findByAttr(MODEL, {code: `'${code}'`})[0]
  }

  static findAllByCodes = (codes) => {
    let jobs = []
    codes.map(code => {
      jobs = [...jobs, ...BaseModel.findByAttr(MODEL, {code: `'${code}'`})]
    })
    return jobs
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

    const idsQuery = job.video_ids.map(id => `id = '${id}'`).join(' OR ');
    return realm.objects('Video').filtered(`(${idsQuery})`)
  }

  static deleteAll = () => {
    BaseModel.deleteAll(MODEL)
  }

  static getSchoolsByJobId = (id) => {
    const job = this.findById(id)
    if (!job) return []

    return realm.objects('School').filtered('id IN $0', Object.values(job.school_ids));
  }

  // private method
  static getFomattedVideoIds = (videos) => {
    return videos.map(video => video.id)
  }

  static getFomattedSchoolIds = (schools) => {
    return schools.map(school => school.id)
  }

  static getFormattedData(job) {
    const {logo, videos, schools, name_km, name_en, ...data} = job
    return {...data, uuid: uuidv4(), logo: job.logo.url, video_ids: this.getFomattedVideoIds(videos), school_ids: this.getFomattedSchoolIds(schools)}
  }
}
