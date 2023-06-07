import listJobs from '../data/json/list_jobs';
import { containsAny } from '../utils/math';

export default class Job {
  static findByCode = (code) => {
    return listJobs.filter(x => x.code == code)[0];
  }

  static findAllByCodes = (codes = []) => {
    return listJobs.filter(job => codes.includes(job.code))
  }

  static findAllByPersonalityTypes = (types = []) => {
    return listJobs.filter(job => containsAny(job.personality_type + '', types))
  }
}
