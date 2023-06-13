import api from '../api/index';
import NetInfo from "@react-native-community/netinfo";
import Sidekiq from '../models/Sidekiq';

export default class SidekiqService {
  // For solving duplicate running
  static isLocked = false;

  static syncToServer = () => {
    return NetInfo.addEventListener(async(state) => {
      if (state.isInternetReachable) {
        setTimeout(() => {
          this.isLocked = false;
        }, 3000);

        Sidekiq.deleteDoneJob();
        this.handleSyncing();
      }
    });
  }

  static handleSyncing = () => {
    if (this.isLocked) return;

    this.isLocked = true;
    this.sync(0, Sidekiq.getAll());
  }

  static sync = async (index, sidekiqs) => {
    let sidekiq = sidekiqs[index];
    if (!sidekiq) return this.isLocked = false;

    try {
      // api.uploadUser('123456')
      const result = await api[sidekiq.modelName](sidekiq.paramUuid);
      Sidekiq.updateFromResponse(result, sidekiq);
      this.sync(index + 1, sidekiqs);
    } catch(err) {
      console.log("-----error, ", err);
    }
  }
}
