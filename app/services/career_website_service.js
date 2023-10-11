import CareerWebsite from '../models/CareerWebsite';
import CareerWebsiteApi from '../api/career_website_api';
import imageDownloadService from './image_download_service';
import asyncStorageService from './async_storage_service';
import realmSyncService from './realm_sync_service';

const careerWebsiteService = (() => {
  return {
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
})();

export default careerWebsiteService;