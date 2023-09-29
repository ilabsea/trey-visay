import CareerWebsite from '../models/CareerWebsite';
import CareerWebsiteApi from '../api/career_website_api';
import {itemsPerPage} from '../constants/sync_data_constant';
import imageDownloadService from './image_download_service';

const careerWebsiteService = (() => {
  return {
    syncAllData,
  }

  function syncAllData(callback) {
    _syncAndRemoveByPage(1, 1, callback)
  }

  // private method
  function _syncAndRemoveByPage(page, totalPage, callback, prevCareers = []) {
    if (page > totalPage) {
      CareerWebsite.deleteAll()
      prevCareers.map(item => {
        CareerWebsite.create(item)
      })
      !!callback && callback()
      return
    }

    new CareerWebsiteApi().load(page, (res) => {
      imageDownloadService.handleDownloadItemsLogo(0, res.career_websites, () => {
        const allPage = Math.ceil(res.pagy.count / itemsPerPage)
        _syncAndRemoveByPage(page+1, allPage, callback, [...prevCareers, ...res.career_websites])
      })
    }, (error) => {
      !!callback && callback(CareerWebsite.getAll())
    })
  }
})();

export default careerWebsiteService;