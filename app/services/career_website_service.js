import CareerWebsite from '../models/CareerWebsite';
import CareerWebsiteApi from '../api/career_website_api';
import {itemsPerPage} from '../constants/sync_data_constant';
import imageDownloadService from './image_download_service';
import asyncStorageService from './async_storage_service';
import realmSyncService from './realm_sync_service';

const careerWebsiteService = (() => {
  return {
    syncAllData,
    syncData,
  }

  async function syncData(callback) {
    let updatedAt = await asyncStorageService.getItem('CAREER_WEBSITE_UPDATED_AT');
    new CareerWebsiteApi().load(updatedAt, (res) => {
      imageDownloadService.handleDownloadItemsLogo(0, res.career_websites, () => {
        realmSyncService.handleSyncObject(CareerWebsite, res.career_websites, updatedAt, (newUpdatedAt) => {
          asyncStorageService.setItem('CAREER_WEBSITE_UPDATED_AT', newUpdatedAt);
        });
      })
      !!callback && callback(CareerWebsite.getAll());
    }, (error) => !!callback && callback(CareerWebsite.getAll()) )
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