import CareerWebsite from '../models/CareerWebsite';
import CareerWebsiteApi from '../api/career_website_api';
import imageDownloadService from './image_download_service';
import asyncStorageService from './async_storage_service';
import realmSyncService from './realm_sync_service';
import useLastUpdatedAt, { lastUpdateAtKeys } from '../hooks/useLastUpdatedAt';

const careerWebsiteService = (() => {
  return { syncData }

  async function syncData(callback) {
    let updatedAt = await useLastUpdatedAt(CareerWebsite, lastUpdateAtKeys.careerWebsite);

    new CareerWebsiteApi().load(updatedAt, (res) => {
      imageDownloadService.handleDownloadItemsLogo(0, res.career_websites, () => {
        realmSyncService.handleSyncObject(CareerWebsite, res.career_websites, updatedAt, (newUpdatedAt) => {
          asyncStorageService.setItem(lastUpdateAtKeys.careerWebsite, newUpdatedAt);
        });
      })
      !!callback && callback();
    }, (error) => !!callback && callback() )
  }
})();

export default careerWebsiteService;
