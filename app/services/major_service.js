import Major from '../models/Major'
import MajorApi from '../api/major_api'
import asyncStorageService from './async_storage_service'
import realmSyncService from './realm_sync_service'
import useLastUpdatedAt, { lastUpdateAtKeys } from '../hooks/useLastUpdatedAt';

const majorService = (() => {
  return {
    syncData,
  }

  async function syncData() {
    let updatedAt = await useLastUpdatedAt(Major, lastUpdateAtKeys.major);

    new MajorApi().load(updatedAt, (res) => {
      realmSyncService.handleSyncObject(Major, res.majors, updatedAt, (newUpdatedAt) => {
        asyncStorageService.setItem(lastUpdateAtKeys.major, newUpdatedAt);
      });
    });
  }
})()

export default majorService
