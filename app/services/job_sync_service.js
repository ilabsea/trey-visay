import Job from '../models/Job'
import imageDownloadService from './image_download_service';
import JobApi from '../api/job_api';
import asyncStorageService from './async_storage_service';
import realmSyncService from './realm_sync_service';
import useLastUpdatedAt, { lastUpdateAtKeys } from '../hooks/useLastUpdatedAt';

const jobSyncService = (() => {
  return {
    syncData
  }

  async function syncData(callback) {
    let updatedAt = await useLastUpdatedAt(Job, lastUpdateAtKeys.job);

    new JobApi().load(updatedAt, (res) => {
      imageDownloadService.handleDownloadItemsLogo(0, res.jobs, () => {
        realmSyncService.handleSyncObject(Job, res.jobs, updatedAt, (newUpdatedAt) => {
          asyncStorageService.setItem(lastUpdateAtKeys.job, newUpdatedAt);
        });
        !!callback && callback()
      })
    }, (error) => !!callback && callback())
  }
})()

export default jobSyncService
