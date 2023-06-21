import BaseApi from './base_api'

export default class SchoolApi extends BaseApi {
  constructor() {
    super('/schools', '')
  }
}