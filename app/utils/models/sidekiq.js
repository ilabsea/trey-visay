import realm from '../../db/schema';
import App from '../app';
import Queue from '../queue';

export default class Sidekiq {
  static create( uuid, tableName ) {
    realm.create('Sidekiq', {
      paramUuid: uuid,
      tableName: tableName,
      version: App.getVersion()
    }, true)

    Queue.makeJob();
  }

  static increaseAttempt(sidekiq){
    try {
      realm.write(() => {
        realm.create('Sidekiq', {
          paramUuid: sidekiq.paramUuid,
          attempt: sidekiq.attempt + 1
        }, true)
      });
    } catch (e) {
      console.log('there is an error update attempt sidekiq');
    }
  }

  static delete(sidekiq) {
    realm.write(() => {
      let obj = realm.objects('Sidekiq').filtered('paramUuid="' + sidekiq.paramUuid + '"')[0];
      realm.delete(obj);
    });
  }
}
