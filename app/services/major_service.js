import Major from '../models/Major'
import {itemsPerPage} from '../constants/sync_data_constant'
import MajorApi from '../api/major_api'

const majorService = (() => {
  return {
    syncAllData
  }

  function syncAllData(callback) {
    _syncAndRemoveByPage(1, 1, callback)
  }

  // private method
  function _handleSaveMajor(collegeMajors, callback) {
    collegeMajors.map(collegeMajor => {
      Major.create(collegeMajor)
    });
    !!callback && callback();
  }

  function _syncAndRemoveByPage(page, totalPage, callback, prevCollegeMajors = []) {
    if (page > totalPage) {
      Major.deleteAll()
      _handleSaveMajor(prevCollegeMajors, callback)
      return
    }

    new MajorApi().load(page, (res) => {
      const allPage = Math.ceil(res.pagy.count / itemsPerPage)
      _syncAndRemoveByPage(page+1, allPage, callback, [...prevCollegeMajors, ...res.majors])
    }, (error) => !!callback && callback())
  }
})()

export default majorService