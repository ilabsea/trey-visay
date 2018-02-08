import { AsyncStorage } from 'react-native';

let STORAGE_KEY = 'USER_ID';
let ADMIN_EXIST_KEY = 'ADMIN_EXISTED';
let TOKEN_KEY = 'TOKEN';

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

  static setToken(token) {
    AsyncStorage.setItem(TOKEN_KEY, token, () => {
      this.token = token;
    });
  }

  static isAdminLoggedin(callback) {
    AsyncStorage.getItem(TOKEN_KEY, (err, token) => {
      if (!!token) {
        this.token = token;
      }

      !!callback && callback(token);
    });
  }

  static getToken() {
    this.token;
  }

  static removeToken(callback) {
    AsyncStorage.removeItem(TOKEN_KEY, () => {
      this.token = null;

      !!callback && callback();
    });
  }
}
