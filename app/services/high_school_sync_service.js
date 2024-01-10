import HighSchool from '../models/HighSchool'
import HighSchoolApi from '../api/high_school_api';
import asyncStorageService from './async_storage_service';
import realmSyncService from './realm_sync_service';
import useLastUpdatedAt, { lastUpdateAtKeys } from '../hooks/useLastUpdatedAt';

const highSchoolSyncService = (() => {
  return {
    syncData
  }

  async function syncData() {
    let updatedAt = await useLastUpdatedAt(HighSchool, lastUpdateAtKeys.highSchool);

    new HighSchoolApi().load(updatedAt, (res) => {
      realmSyncService.handleSyncObject(HighSchool, res.high_schools, updatedAt, (newUpdatedAt) => {
        asyncStorageService.setItem(lastUpdateAtKeys.highSchool, newUpdatedAt);
      });
    })
  }
})()

export default highSchoolSyncService;
