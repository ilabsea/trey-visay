import JobCluter from '../models/JobCluster'
import JobCluterApi from '../api/job_cluster_api'
import asyncStorageService from './async_storage_service'
import realmSyncService from './realm_sync_service'

const jobClusterService = (() => {
  return {
    syncData
  }

  async function syncData() {
    const updatedAt = await asyncStorageService.getItem('JOB_CLUSTER_UPDATED_AT');
    new JobCluterApi().load(updatedAt, (res) => {
      realmSyncService.handleSyncObject(JobCluter, res.job_clusters, updatedAt, (newUpdatedAt) => {
        asyncStorageService.setItem('JOB_CLUSTER_UPDATED_AT', newUpdatedAt);
      });
    });
  }
})();

export default jobClusterService;