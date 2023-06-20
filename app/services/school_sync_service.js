import fileDownloadService from './file_download_service'
import School from '../models/School'
import {pullSchools} from '../api/school_api';

const schoolSyncService = (() => {
  return {
    syncAllData
  }

  function syncAllData(successCallback, failureCallback) {
    _syncAndRemoveByPage(1, 1, successCallback, failureCallback)
  }

  // private method
  function _handleSaveSchool(schools) {
    schools.map(school => {
      const savedSchool = School.findById(school.id)
      !!savedSchool ? School.update(savedSchool.uuid, school) : School.create(school)
    });
  }

  async function _syncAndRemoveByPage(page, totalPage, successCallback, failureCallback, prevSchools = []) {
    if (page > totalPage) {
      School.deleteAll()
      _handleSaveSchool(prevSchools)
      return successCallback(prevSchools)
    }

    const fetchedSchools = pullSchools()
    fetchedSchools
      .then((res) => {
        console.log('==== pull schools success == ', res)
        // _handleDownloadLogo(0, res.facilities, () => {
        //   const allPage = Math.ceil(res.pagy.count / itemsPerPage)
        //   _syncAndRemoveByPage(page+1, allPage, successCallback, failureCallback, [...prevSchools, ...res.facilities])
        // })
      })
      .catch(err => {
        console.log('=== pull schools error = ', err)
        !!failureCallback && failureCallback()
      })


    // const response = await new FacilityApi().load(page)
    // apiService.handleApiResponse(response, (res) => {
    //   _handleDownloadLogo(0, res.facilities, () => {
    //     const allPage = Math.ceil(res.pagy.count / itemsPerPage)
    //     _syncAndRemoveByPage(page+1, allPage, successCallback, failureCallback, [...prevSchools, ...res.facilities])
    //   })
    // }, (error) => !!failureCallback && failureCallback())
  }

  function _handleDownloadLogo(index, facilities, callback) {
    if (index >= facilities.length)
      return !!callback && callback();

    const facility = facilities[index]
    if (!!facility.logo && !FacilityImage.isFileNameExisted(facility.logo)) {
      fileDownloadService.download(facility.logo, (filename, isNewFile) => {
        !!isNewFile && FacilityImage.create({name: filename})
        _handleDownloadLogo(index + 1, facilities, callback)
      }, () => _handleDownloadLogo(index + 1, facilities, callback))
    }
    else _handleDownloadLogo(index + 1, facilities, callback)
  }
})()

export default schoolSyncService