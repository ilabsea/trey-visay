import { AsyncStorage } from 'react-native';

let STORAGE_KEY = 'USER_ID';
let ADMIN_EXIST_KEY = 'ADMIN_EXISTED';

export default class User {
  static userID;
  static adminExisted;

  static getID() {
    return this.userID;
  }

  static setID(id) {
    this.userID = id;
  }

  static isAdminExisted(callback) {
    AsyncStorage.getItem(ADMIN_EXIST_KEY, (err, result) => {
      if (!!result) {
        this.adminExisted = 'true';
      }

      !!callback && callback(result);
    });

    return this.adminExisted;
  }

  static setAdminExisted(callback) {
    AsyncStorage.setItem(ADMIN_EXIST_KEY, 'true', () => {
      this.adminExisted = 'true';
      !!callback && callback();
    });
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
