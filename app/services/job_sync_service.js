import Job from '../models/Job'
import {itemsPerPage} from '../constants/sync_data_constant';
import imageDownloadService from './image_download_service';
import JobApi from '../api/job_api';

const jobSyncService = (() => {
  return {
    syncAllData
  }

  function syncAllData(callback) {
    _syncAndRemoveByPage(1, 1, callback)
  }

  // private method
  function _handleSaveJob(jobs) {
    jobs.map(job => {
      Job.create(job)
    });
  }

  function _syncAndRemoveByPage(page, totalPage, callback, prevJobs = []) {
    if (page > totalPage) {
      Job.deleteAll()
      _handleSaveJob(prevJobs)
      !!callback && callback()
      return 
    }

    new JobApi().load(page, (res) => {
      imageDownloadService.handleDownloadItemsLogo(0, res.jobs, () => {
        const allPage = Math.ceil(res.pagy.count / itemsPerPage)
        _syncAndRemoveByPage(page+1, allPage, callback, [...prevJobs, ...res.jobs])
      })
    }, (error) => {
      !!callback && callback()
    })
  }
})()

export default jobSyncService