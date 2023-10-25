import realm from '../db/schema';
import uuidv4 from '../utils/uuidv4';
import { environment } from '../config/environment';

const MODEL = "Sidekiq";

export default class Sidekiq {
  static getAll = () => {
    let jobs = realm.objects(MODEL).filtered("isDone = false") || [];
    return JSON.parse(JSON.stringify(jobs)) ;
  }

  static setDone = (sidekiq) => {
    realm.write(() => {
      realm.create(MODEL, {uuid: sidekiq.uuid, isDone: true}, 'modified');
    });
  }

  static increaseAttempt = (sidekiq) => {
    realm.write(() => {
      realm.create(MODEL, {uuid: sidekiq.uuid, attempt: sidekiq.attempt + 1}, 'modified');
    });
  }

  static updateFromResponse = (result = {}, sidekiq) => {
    if (result.ok) {
      this.setDone(sidekiq);
    } else {
      if (sidekiq.attempt >= environment.maxFailedAttempt) {
        this.setDone(sidekiq);
      } else {
        this.increaseAttempt(sidekiq);
      }
    }
  }

  static deleteDoneJob = () => {
    let jobs = realm.objects(MODEL).filtered("isDone = true");

    realm.write(() => {
      realm.delete(jobs);
    });
  }
}
