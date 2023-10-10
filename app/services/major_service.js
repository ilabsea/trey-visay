import Major from '../models/Major'
import MajorApi from '../api/major_api'
import asyncStorageService from './async_storage_service'
import realmSyncService from './realm_sync_service'

const majorService = (() => {
  return {
    syncData,
  }

  async function syncData() {
    let updatedAt = await asyncStorageService.getItem('MAJOR_UPDATED_AT');
    new MajorApi().load(updatedAt, (res) => {
      realmSyncService.handleSyncObject(Major, res.majors, updatedAt, (newUpdatedAt) => {
        asyncStorageService.setItem('MAJOR_UPDATED_AT', newUpdatedAt);
      });
    });
  }
})()

export default majorService