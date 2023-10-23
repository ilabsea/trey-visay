import BaseApi from './base_api'

export default class JobClusterApi extends BaseApi {
  constructor() {
    super('/job_clusters', '')
  }
}