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
    highSchoolCode: { type: 'string', optional: true },
    provinceCode: { type: 'string', optional: true },
    districtCode: { type: 'string', optional: true },
    communeCode: { type: 'string', optional: true },
    grade: { type: 'string', optional: true },
    role: { type: 'string', default: 'student' },
    // * Other
    games: { type: 'list', objectType: 'Game' },
    isVisited: { type: 'bool', default: false },
    token: { type: 'string', optional: true },
  }
}
