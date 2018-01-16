// totalCount is totalEntries
// pageCount is total items in the current page

import { random, min, times } from 'lodash';
import videoList from '../data/json/videos';

const perPage = 10
const totalCount = videoList.length;

export default {
  getVideos(page) {
    return new Promise(resolve => {
      setTimeout(() => {
        const pageCount = min([totalCount - (page - 1) * perPage, perPage]);
        const pagination = { page, perPage, pageCount, totalCount };

        let offset = (page - 1) * perPage;
        let endPoint = page * perPage;
        const records = videoList.slice(offset, endPoint);

        resolve({ pagination, records });
      }, random(500, 1000))
    })
  },

  getVideosByName() {

  }
}
