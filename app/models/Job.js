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
    BaseModel.create(MODEL, this.getFormattedData(data, false), 'modified')
  }

  static getAll = () => {
    return BaseModel.getAll(MODEL)
  }

  static getLastUpdatedAt = () => {
    return BaseModel.getLastUpdatedAt(MODEL);
  }

  static update = (uuid, data) => {
    BaseModel.update(MODEL, uuid, this.getFormattedData(data, true));
  }

  static findAllByJobCluster = (jobClusterCode) => {
    return [...BaseModel.findByAttr(MODEL, { job_cluster_code: `'${jobClusterCode}'` })]
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
      jobs = [...jobs, ...BaseModel.beginsWith(MODEL, 'personality_type', `'${type}'`)]
    })
    return arrayUtil.filterDuplicate(jobs, 'id')
  }

  static getVideosById = (jobId) => {
    const job = this.findById(jobId)
    if (!job || job.video_ids.length == 0) return []

    const idsQuery = job.video_ids.map(id => `id = '${id}'`).join(' OR ');
    return realm.objects('Video').filtered(`(${idsQuery})`)
  }

  static deleteAll = () => {
    BaseModel.deleteAll(MODEL)
  }

  static deleteByUuid = (uuid) => {
    BaseModel.deleteByUuid(MODEL, uuid);
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

  static getFormattedData(job, isUpdate) {
    const {logo, videos, schools, job_cluster, name_km, name_en, ...data} = job
    const params = {...data, uuid: uuidv4(), logo: job.logo.url, video_ids: this.getFomattedVideoIds(videos), school_ids: !!schools ? this.getFomattedSchoolIds(schools) : [],
                      job_cluster_id: job_cluster.id || null, job_cluster_code: job_cluster.code || null, job_cluster_name: job_cluster.name || null
                   }

    if (isUpdate)
      return params;

    return {...params, uuid: uuidv4()};
  }
}
