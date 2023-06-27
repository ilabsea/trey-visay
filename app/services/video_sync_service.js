import Video from '../models/Video'
import {itemsPerPage} from '../constants/sync_data_constant';
import VideoApi from '../api/video_api';

const videoSyncService = (() => {
  return {
    syncAllData
  }

  function syncAllData(callback) {
    _syncAndRemoveByPage(1, 1, callback)
  }

  // private method
  function _handleSaveVideo(videos) {
    videos.map(video => {
      Video.create(video)
    });
  }

  function _syncAndRemoveByPage(page, totalPage, callback, prevVideos = []) {
    if (page > totalPage) {
      Video.deleteAll()
      _handleSaveVideo(prevVideos)
      !!callback && callback(Video.getAll())
      return 
    }

    new VideoApi().load(page, (res) => {
      const allPage = Math.ceil(res.pagy.count / itemsPerPage)
      _syncAndRemoveByPage(page+1, allPage, callback, [...prevVideos, ...res.videos])
    }, (error) => {
      !!callback && callback(Video.getAll())
    })
  }
})()

export default videoSyncService