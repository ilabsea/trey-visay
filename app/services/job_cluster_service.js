import JobCluter from '../models/JobCluster'
import JobCluterApi from '../api/job_cluster_api'
import asyncStorageService from './async_storage_service'
import realmSyncService from './realm_sync_service'
import imageDownloadService from './image_download_service'

const jobClusterService = (() => {
  return {
    syncData
  }

  async function syncData(callback) {
    const updatedAt = await asyncStorageService.getItem('JOB_CLUSTER_UPDATED_AT');
    new JobCluterApi().load(updatedAt, (res) => {
      imageDownloadService.handleDownloadItemsLogo(0, res.job_clusters, () => {
        realmSyncService.handleSyncObject(JobCluter, res.job_clusters, updatedAt, (newUpdatedAt) => {
          asyncStorageService.setItem('JOB_CLUSTER_UPDATED_AT', newUpdatedAt);
        });
        !!callback && callback()
      });
    });
  }
})();

export default jobClusterService;