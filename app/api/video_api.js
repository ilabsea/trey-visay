import BaseApi from './base_api'

export default class VideoApi extends BaseApi {
  constructor() {
    super('/videos', '')
  }
}