import Major from '../models/Major'
import {itemsPerPage} from '../constants/sync_data_constant'
import MajorApi from '../api/major_api'

const majorService = (() => {
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

    new MajorApi().load(page, (res) => {
      const allPage = Math.ceil(res.pagy.count / itemsPerPage)
      _syncAndRemoveByPage(page+1, allPage, [...prevCollegeMajors, ...res.majors])
    })
  }
})()

export default majorService