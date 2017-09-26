// /* Still working around */

import DbHelper from './db/dbhelper';

class Queries {

  /* a typical query */
  getAllFromUser(filterValue: string = null) {
    let filter = null;
    if (filterValue) {
        filter = `two = ${filterValue}`;
    }
    // let results = DbHelper.getInstance()
    //     .query('User', filter);
    let results = DbHelper.getInstance().query('User', filter);

    return results;
  }

  // /* return some JSON data that we originally stored in the Realm as a string */
  // getSomeJsonData() {
  //   let results = DbHelper.getInstance()
  //       .query('User');

  //   if(results.length) {
  //       let parsed = JSON.parse(results[0].objectA);
  //       return parsed.objectB;
  //   }
  //   return null;
  // }
}

export default new Queries();
