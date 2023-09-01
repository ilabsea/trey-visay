import Major from '../models/Major'
import {itemsPerPage} from '../constants/sync_data_constant'
import CollegeMajorApi from '../api/college_major_api'

const collegeMajorSyncService = (() => {
  return {
    syncAllData
  }

  function syncAllData() {
    _syncAndRemoveByPage(1, 1)
  }

  // private method
  function _handleSaveMajor(collegeMajors) {
    collegeMajors.map(collegeMajor => {
      Major.create(collegeMajor)
    });
  }

  function _syncAndRemoveByPage(page, totalPage, prevCollegeMajors = []) {
    if (page > totalPage) {
      Major.deleteAll()
      _handleSaveMajor(prevCollegeMajors)
      return
    }

    new CollegeMajorApi().load(page, (res) => {
      const allPage = Math.ceil(res.pagy.count / itemsPerPage)
      _syncAndRemoveByPage(page+1, allPage, [...prevCollegeMajors, ...res.majors])
    })
  }
})()

export default collegeMajorSyncService