import BaseApi from './base_api'

export default class CollegeMajorApi extends BaseApi {
  constructor() {
    super('/college_majors', '')
  }
}