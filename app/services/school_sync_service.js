import fileDownloadService from './file_download_service'
import School from '../models/School'
import DownloadedImage from '../models/DownloadedImage';
import SchoolApi from '../api/school_api';
import {itemsPerPage} from '../constants/sync_data_constant';
import fileUtil from '../utils/file_util';

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

    new SchoolApi().load((res) => {
      _handleDownloadLogo(0, res.schools, () => {
        const allPage = Math.ceil(res.pagy.count / itemsPerPage)
        _syncAndRemoveByPage(page+1, allPage, kind, successCallback, failureCallback, [...prevSchools, ...res.schools])
      })
    }, (error) => {
      !!failureCallback && failureCallback()
    })
  }

  function _handleDownloadLogo(index, schools, callback) {
    if (index >= schools.length)
      return !!callback && callback();

    const school = schools[index]  
    if (school.logo.url != null && !DownloadedImage.isFileNameExisted(school.logo.url) && fileUtil.isFileImage(school.logo.url)) {
      fileDownloadService.download(school.logo.url, (filename, isNewFile) => {
        !!isNewFile && DownloadedImage.create({name: filename})
        _handleDownloadLogo(index + 1, schools, callback)
      }, () => _handleDownloadLogo(index + 1, schools, callback))
    }
    else _handleDownloadLogo(index + 1, schools, callback)
  }
})()

export default schoolSyncService