import School from '../models/School'
import SchoolApi from '../api/school_api';
import imageDownloadService from './image_download_service';
import asyncStorageService from './async_storage_service';
import realmSyncService from './realm_sync_service';
import useLastUpdatedAt, { lastUpdateAtKeys } from '../hooks/useLastUpdatedAt';

const schoolSyncService = (() => {
  return {
    syncData,
  }

  async function syncData(kind, successCallback) {
    let updatedAt = await useLastUpdatedAt(School, lastUpdateAtKeys.school)

    new SchoolApi().load(updatedAt, (res) => {
      imageDownloadService.handleDownloadItemsLogo(0, res.schools, () => {
        realmSyncService.handleSyncObject(School, res.schools, updatedAt, (newUpdatedAt) => {
          asyncStorageService.setItem(lastUpdateAtKeys.school, newUpdatedAt);
        });
        !!successCallback && successCallback(School.findByKind(kind))
      })
    }, (error) => {
      !!successCallback && successCallback(School.findByKind(kind))
    })
  }
})()

export default schoolSyncService;
