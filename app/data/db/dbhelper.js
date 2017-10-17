import Db from './db';
import User from '../models/user';
import PersonalUnderstanding from '../models/personal_understanding';

class DbHelper {
  modelSchema = [
    User,
    PersonalUnderstanding,
  ];

  // activeInstancePath = (myLocalRealmPath)

  getInstance(): Db {
    // let instance: Db = this.activeInstancePath;
    // let instance: Db;
    // if(!instance) {
    //     throw new Error('DbHelper.js :: Active Instance Not Set!');
    // }
    // return instance;
    return {};
  }

  getInstance() {

  }

  // query(model: string, filter?: string) {
  //   let results = this.realm.objects(model);
  //   if(filter) {
  //       return results.filtered(filter);
  //   }
  //   return results;
  // }

  /* note: this is where you would also setInstance and define a constant, or other method for the instance path */
}
