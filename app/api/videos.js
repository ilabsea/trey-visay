// totalCount is totalEntries
// pageCount is total items in the current page

import { random, min, times } from 'lodash';
import videoList from '../data/json/videos';

const perPage = 10


export default {
  getVideos(page) {
    return new Promise(resolve => {
      setTimeout(() => {
        const totalCount = videoList.length;
        const pageCount = min([totalCount - (page - 1) * perPage, perPage]);
        const pagination = { page, perPage, pageCount, totalCount };

        let offset = (page - 1) * perPage;
        let endPoint = page * perPage;
        const records = videoList.slice(offset, endPoint);

        resolve({ pagination, records });
      }, random(500, 1000))
    })
  },
  getVideosByName(name, page) {
    return new Promise(resolve => {
      setTimeout(() => {
        let list = [];
        if (!!name) {
          list = videoList.filter((video) => {
            return video.title.toLowerCase().indexOf(name.toLowerCase()) > -1
          })
        }
        const totalCount = list.length;
        const pageCount = min([totalCount - (page - 1) * perPage, perPage]);
        const pagination = { page, perPage, pageCount, totalCount };

        let offset = (page - 1) * perPage;
        let endPoint = page * perPage;

        const records = list.slice(offset, endPoint);

        resolve({ pagination, records });
      }, random(500, 1000))
    })
  }
}
