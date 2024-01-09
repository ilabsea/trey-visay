import HighSchool from '../models/HighSchool'
import HighSchoolApi from '../api/high_school_api';
import asyncStorageService from './async_storage_service';
import realmSyncService from './realm_sync_service';

const storageKey = 'HIGH_SCHOOL_LAST_UPDATED_AT';

const highSchoolSyncService = (() => {
  return {
    syncData,
    initUpdatedAt
  }

  async function syncData() {
    let updatedAt = await asyncStorageService.getItem(storageKey);

    new HighSchoolApi().load(updatedAt, (res) => {
      realmSyncService.handleSyncObject(HighSchool, res.high_schools, updatedAt, (newUpdatedAt) => {
        asyncStorageService.setItem(storageKey, newUpdatedAt);
      });
    })
  }

  async function initUpdatedAt() {
    if (!await asyncStorageService.getItem(storageKey))
      asyncStorageService.setItem(storageKey, HighSchool.getLastUpdatedAt());
  }
})()

export default highSchoolSyncService;
