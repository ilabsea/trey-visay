import Job from '../models/Job'
import {itemsPerPage} from '../constants/sync_data_constant';
import imageDownloadService from './image_download_service';

const jobSyncService = (() => {
  return {
    syncAllData
  }

  function syncAllData(successCallback, failureCallback) {
    _syncAndRemoveByPage(1, 1, successCallback, failureCallback)
  }

  // private method
  function _handleSaveJob(jobs) {
    jobs.map(job => {
      Job.create(job)
    });
  }

  function _syncAndRemoveByPage(page, totalPage, successCallback, failureCallback, prevJobs = []) {
    if (page > totalPage) {
      School.deleteAll()
      _handleSaveJob(prevJobs)
      !!successCallback && successCallback(Job.getAll())
      return 
    }

    new SchoolApi().load((res) => {
      imageDownloadService.handleDownloadItemsLogo(0, res.jobs, () => {
        const allPage = Math.ceil(res.pagy.count / itemsPerPage)
        _syncAndRemoveByPage(page+1, allPage, successCallback, failureCallback, [...prevJobs, ...res.jobs])
      })
    }, (error) => {
      !!failureCallback && failureCallback()
    })
  }
})()

export default jobSyncService