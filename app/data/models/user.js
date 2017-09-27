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
    userName: { type: 'string', indexed: true },
    sex: { type: 'string', optional: true },
    dateOfBirth: { type: 'date', optional: true },
    phoneNumber: { type: 'string', optional: true },
    nationality: { type: 'string', optional: true },
    schoolName: { type: 'string', optional: true },
    grade: { type: 'string', optional: true },
    address: { type: 'string', optional: true },
    role: { type: 'string', default: 'student' },
    // *family information
    fatherName: { type: 'string', optional: true },
    fatherOccupation: { type: 'string', optional: true },
    motherName: { type: 'string', optional: true },
    motherOccupation: { type: 'string', optional: true },
    guidance: { type: 'string', optional: true },
    parentContactNumber: { type: 'string', optional: true },
    numberOfFamilyMember: { type: 'int', default: 0 },
    numberOfSisters: { type: 'int', default: 0 },
    numberOfBrothers: { type: 'int', default: 0 },
    // * family Situation
    isDivorce: { type: 'bool', default: false },
    isDisable: { type: 'bool', default: false },
    isDomesticViolence: { type: 'bool', default: false },
    isSmoking: { type: 'bool', default: false },
    isAlcoholic: { type: 'bool', default: false },
    isDrug: {type: 'bool', default: false},
    houseType: { type: 'string', optional: true },
    collectiveIncome: { type: 'string', optional: true }
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