import BaseApi from './base_api'

export default class HighSchoolApi extends BaseApi {
  constructor() {
    super('/high_schools', '')
  }
}
