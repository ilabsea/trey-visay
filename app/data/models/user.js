'use strict';

import Realm from 'realm';

export default class User extends Realm.Object {}

User.schema = {
  name: 'User',
  primaryKey: 'id',
  properties: {
    id: 'int',
    fullName: 'string',
    password: 'string',
    userName: 'string',
    sex: 'string',
    date_of_birth: 'date',
    phone_number: 'string',
    nationality: 'string',
    school_name: 'string',
    grade: 'string',
    address: 'string',
    role: 'string',
    // *family information
    father_name: 'string',
    father_occupation: 'string',
    mother_name: 'string',
    mother_occupation: 'string',
    guidance: 'string',
    parent_contact_number: 'string',
    number_of_family_member: 'int',
    number_of_sisters: {type: 'int', default: 0},
    number_of_brothers: {type: 'int', default: 0},
    // * family Situation
    is_divorce: {type: 'bool', default: false},
    is_disable: {type: 'bool', default: false},
    is_domestic_violence: {type: 'bool', default: false},
    is_smoking: {type: 'bool', default: false},
    is_alcoholic: {type: 'bool', default: false},
    is_drug: {type: 'bool', default: false},
    house_type: 'string',
    collective_income: 'string'
  }
}

// Another snippet
// class User extends Realm.Object {}
// User.schema = {
//   name: 'User',
//   properties: {
//     fullName: 'string'
//   }
// };
// export default User;
