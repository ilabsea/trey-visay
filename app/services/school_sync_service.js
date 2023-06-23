import School from '../models/School'
import SchoolApi from '../api/school_api';
import {itemsPerPage} from '../constants/sync_data_constant';
import imageDownloadService from './image_download_service';

const schoolSyncService = (() => {
  return {
    syncAllData
  }

  function syncAllData(kind, successCallback, failureCallback) {
    _syncAndRemoveByPage(1, 1, kind, successCallback, failureCallback)
  }

  // private method
  function _handleSaveSchool(schools) {
    schools.map(school => {
      School.create(school)
    });
  }

  function _syncAndRemoveByPage(page, totalPage, kind, successCallback, failureCallback, prevSchools = []) {
    if (page > totalPage) {
      School.deleteAll()
      _handleSaveSchool(prevSchools)
      !!successCallback && successCallback(School.findByKind(kind))
      return 
    }

    new SchoolApi().load(page, (res) => {
      imageDownloadService.handleDownloadItemsLogo(0, res.schools, () => {
        const allPage = Math.ceil(res.pagy.count / itemsPerPage)
        _syncAndRemoveByPage(page+1, allPage, kind, successCallback, failureCallback, [...prevSchools, ...res.schools])
      })
    }, (error) => {
      !!failureCallback && failureCallback()
    })
  }
})()

export default schoolSyncService