import School from '../models/School'
import SchoolApi from '../api/school_api';
import imageDownloadService from './image_download_service';
import asyncStorageService from './async_storage_service';
import realmSyncService from './realm_sync_service';

const schoolSyncService = (() => {
  return {
    syncData,
  }

  async function syncData(kind, successCallback) {
    let updatedAt = await asyncStorageService.getItem('SCHOOL_UPDATED_AT');
    new SchoolApi().load(updatedAt, (res) => {
      imageDownloadService.handleDownloadItemsLogo(0, res.schools, () => {
        realmSyncService.handleSyncObject(School, res.schools, updatedAt, (newUpdatedAt) => {
          asyncStorageService.setItem('SCHOOL_UPDATED_AT', newUpdatedAt);
        });
        !!successCallback && successCallback(School.findByKind(kind))
      })
    }, (error) => {
      !!successCallback && successCallback(School.findByKind(kind))
    })
  }
})()

export default schoolSyncService