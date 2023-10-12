import Video from '../models/Video'
import VideoApi from '../api/video_api';
import asyncStorageService from './async_storage_service';
import realmSyncService from './realm_sync_service';

const videoSyncService = (() => {
  return {
    syncData
  }

  async function syncData(callback) {
    let updatedAt = await asyncStorageService.getItem('VIDEO_UPDATED_AT');
    new VideoApi().load(updatedAt, (res) => {
      realmSyncService.handleSyncObject(Video, res.videos, updatedAt, (newUpdatedAt) => {
        asyncStorageService.setItem('VIDEO_UPDATED_AT', newUpdatedAt);
      });
      !!callback && callback(Video.getAll())
    }, (error) => {
      !!callback && callback(Video.getAll())
    })
  }
})()

export default videoSyncService