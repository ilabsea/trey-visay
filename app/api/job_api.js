import BaseApi from './base_api'

export default class JobApi extends BaseApi {
  constructor() {
    super('/jobs', '')
  }
}