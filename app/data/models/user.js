'use strict';

import Realm from 'realm';

export default class User extends Realm.Object {}

User.schema = {
  name: 'User',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    fullName: 'string',
    password: 'string',
    username: { type: 'string', indexed: true },
    sex: { type: 'string', optional: true },
    photo: { type: 'string', optional: true},
    cover: { type: 'string', optional: true},
    dateOfBirth: { type: 'string', optional: true },
    phoneNumber: { type: 'string', optional: true },
    nationality: { type: 'string', optional: true },
    highSchoolId: { type: 'string', optional: true },
    grade: { type: 'string', optional: true },
    address: { type: 'string', optional: true },
    role: { type: 'string', default: 'student' },
    // * family Situation
    isDivorce: { type: 'bool', default: false },
    isDisable: { type: 'bool', default: false },
    isDomesticViolence: { type: 'bool', default: false },
    isSmoking: { type: 'bool', default: false },
    isAlcoholic: { type: 'bool', default: false },
    isDrug: {type: 'bool', default: false},
    houseType: { type: 'string', optional: true },
    collectiveIncome: { type: 'string', optional: true },
    // * Other
    games: { type: 'list', objectType: 'Game' },
    isVisited: { type: 'bool', default: false },
    token: { type: 'string', optional: true },
  }
}
