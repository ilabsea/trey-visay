import Video from '../models/Video'
import VideoApi from '../api/video_api';
import asyncStorageService from './async_storage_service';
import realmSyncService from './realm_sync_service';
import useLastUpdatedAt, { lastUpdateAtKeys } from '../hooks/useLastUpdatedAt';

const videoSyncService = (() => {
  return { syncData }

  async function syncData(callback) {
    let updatedAt = await useLastUpdatedAt(Video, lastUpdateAtKeys.video)

    new VideoApi().load(updatedAt, (res) => {
      realmSyncService.handleSyncObject(Video, res.videos, updatedAt, (newUpdatedAt) => {
        asyncStorageService.setItem(lastUpdateAtKeys.video, newUpdatedAt);
      });
      !!callback && callback(Video.getAll())
    }, (error) => {
      !!callback && callback(Video.getAll())
    })
  }
})()

export default videoSyncService
