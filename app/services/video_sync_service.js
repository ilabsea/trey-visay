import Moment from 'moment';
import Video from '../models/Video'
import VideoApi from '../api/video_api';
import asyncStorageService from './async_storage_service';

const videoSyncService = (() => {
  return {
    syncDataByPage
  }

  async function syncDataByPage(page, callback) {
    let updatedAt = await asyncStorageService.getItem('VIDEO_UPDATED_AT');
    new VideoApi().load(page, updatedAt, (res) => {
      res.videos.map(video => {
        const existedVideo = Video.findById(video.id)
        if (!updatedAt || (!!updatedAt && Moment(updatedAt).isBefore(video.updated_at)))
          updatedAt = video.updated_at;

        if (video.deleted_at)
          !!existedVideo && Video.deleteByUuid(existedVideo.uuid);
        else if (!existedVideo)
          Video.create(video)
        else if (!Moment(video.updated_at).isSame(existedVideo.updated_at))
          Video.update(existedVideo.uuid, video);
      });
      asyncStorageService.setItem('VIDEO_UPDATED_AT', updatedAt);
      !!callback && callback(Video.getAll(), false)
    }, (error) => {
      !!callback && callback(Video.getAll(), true)
    })
  }
})()

export default videoSyncService