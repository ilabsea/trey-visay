import {
  AsyncStorage,
} from 'react-native';

let STORAGE_KEY = 'USER_ID';

export default class User {
  static userID;

  static getID() {
    return this.userID;
  }

  static setID(id) {
    this.userID = id;
  }

  static setLogin(userID, callback) {
    AsyncStorage.setItem(STORAGE_KEY, userID, () => {
      this.setID(userID);
      !!callback && callback();
    });
  }

  static logout(callback) {
    AsyncStorage.removeItem(STORAGE_KEY, () => {
      this.setID(null);
      !!callback && callback();
    });
  }

  static isLoggedin(callback) {
    AsyncStorage.getItem(STORAGE_KEY, (err, result) => {
      if (!!result) {
        this.setID(result);
      }

      !!callback && callback(result);
    });
  }
}
