import JobCluster from '../models/JobCluster'
import JobClusterApi from '../api/job_cluster_api'
import asyncStorageService from './async_storage_service'
import realmSyncService from './realm_sync_service'
import imageDownloadService from './image_download_service'
import useLastUpdatedAt, { lastUpdateAtKeys } from '../hooks/useLastUpdatedAt';

const jobClusterService = (() => {
  return { syncData }

  async function syncData(callback) {
    const updatedAt = await useLastUpdatedAt(JobCluster, lastUpdateAtKeys.jobCluster);

    new JobClusterApi().load(updatedAt, (res) => {
      imageDownloadService.handleDownloadItemsLogo(0, res.job_clusters, () => {
        realmSyncService.handleSyncObject(JobCluster, res.job_clusters, updatedAt, (newUpdatedAt) => {
          asyncStorageService.setItem(lastUpdateAtKeys.JobCluster, newUpdatedAt);
        });
        !!callback && callback()
      });
    });
  }
})();

export default jobClusterService;
