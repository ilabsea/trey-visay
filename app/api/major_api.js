import BaseApi from './base_api'

export default class MajorApi extends BaseApi {
  constructor() {
    super('/majors', '')
  }
}