import BackgroundFetch from "react-native-background-fetch";
import UploadServices from '../services/upload_services';
import { environment } from '../config/environment';

export default class Task {
  static configBackgroundFetch(){
    BackgroundFetch.configure({
      minimumFetchInterval: environment.minimumFetchInterval,
    }, () => {
      console.log("[js] Received background-fetch event");
      BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
    }, (error) => {
      console.log("[js] RNBackgroundFetch failed to start");
    });

    BackgroundFetch.status((status) => {
      switch(status) {
        case BackgroundFetch.STATUS_RESTRICTED:
          console.log("BackgroundFetch restricted");
          break;
        case BackgroundFetch.STATUS_DENIED:
          console.log("BackgroundFetch denied");
          break;
        case BackgroundFetch.STATUS_AVAILABLE:
          console.log("BackgroundFetch is enabled");
          Task.syncToServer();
          break;
      }
    });
  }

  static syncToServer(){
    UploadServices.syncToServer();
  }
}
