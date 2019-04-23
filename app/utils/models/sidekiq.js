import realm from '../../db/schema';
import App from '../app';

export default class Sidekiq {
  static create( uuid, tableName ) {
    realm.create('Sidekiq', {
      paramUuid: uuid,
      tableName: tableName,
      version: App.getVersion()
    }, true)
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

  static delete(sidekiq){
    realm.write(() => {
      realm.delete(sidekiq);
    });
  }
}
