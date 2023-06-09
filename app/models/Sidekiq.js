import BaseModel from './BaseModel';
import realm from '../db/schema';
import uuidv4 from '../utils/uuidv4';
import api from '../api/index';
import NetInfo from "@react-native-community/netinfo";

const MODEL = "Sidekiq";

export default class Sidekiq {
  static getAll = () => {
    return realm.objects(MODEL).filtered("isDone = false");
  }

  static create = (params) => {
    let sidekiq = realm.create(MODEL, {...params, uuid: uuidv4()});

    NetInfo.fetch().then(state => {
      if (state.isInternetReachable) {
        this.sync(sidekiq);
      }
    });

    return sidekiq;
  }

  static syncToServer = () => {
    NetInfo.fetch().then(state => {
      if (state.isInternetReachable) {
        this.syncAll();
      }
    });
  }

  static syncAll = () => {
    let sidekiqs = this.getAll();
    console.log(sidekiqs)

    for(let i=0; i<sidekiqs.length; i++) {
      this.sync(sidekiqs[i]);
    }
  }

  static sync = async (sidekiq) => {
    // api.uploadUser('123456')
    const result = await api[sidekiq.modelName](sidekiq.paramUuid);

    if (result.ok) {
      realm.write(() => {
        sidekiq.isDone = true
      });
    }
  }

  static write = (callback) => {
    realm.write(() => {
      !!callback && callback();
    });
  }
}
