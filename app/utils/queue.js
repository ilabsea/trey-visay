import UploadServices from '../services/upload_services';
import queueFactory from 'react-native-queue';
import realm from '../db/schema';

export default class Queue {
  static async initWorker() {
    queue = await queueFactory();
    queue.addWorker('uploadData', async (id, payload) => {
      UploadServices.syncToServer();
    });

    if (!!realm.objects('Sidekiq').length) {
      Queue.makeJob();
    }
  }

  static async makeJob(payload={}) {
    queue = await queueFactory();
    queue.createJob('uploadData', payload, {}, true);
  }
}
