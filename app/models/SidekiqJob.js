import realm from '../db/schema';
import uuidv4 from '../utils/uuidv4';
import SidekiqService from '../services/SidekiqService';

const MODEL = "Sidekiq";

export default class SidekiqJob {
  static findByParam = (paramUuid, modelName) => {
    return realm.objects(MODEL).filtered(`paramUuid == '${paramUuid}' AND modelName == '${modelName}' AND isDone = false`)[0];
  }

  static create = (paramUuid, modelName) => {
    if (!!this.findByParam(paramUuid, modelName)) {
      SidekiqService.handleSyncing();
      return console.log('already exist');
    };

    let sidekiq = realm.create(MODEL, {paramUuid: paramUuid, modelName: modelName, uuid: uuidv4()});
    SidekiqService.handleSyncing();

    return sidekiq;
  }
}
