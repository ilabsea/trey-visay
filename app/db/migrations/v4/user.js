'use strict';

import Realm from 'realm';

export default class User extends Realm.Object {}

User.schema = {
  name: 'User',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    fullName: 'string',
    sex: { type: 'string', optional: true },
    dateOfBirth: { type: 'string', optional: true },
    phoneNumber: { type: 'string', optional: true },
    grade: { type: 'string', optional: true },
    classGroup: { type: 'string', optional: true },
    provinceCode: { type: 'string', optional: true },
    districtCode: { type: 'string', optional: true },
    highSchoolCode: { type: 'string', optional: true },
    serverId: { type: 'int', optional: true },
    createdAt: 'date'
  }
}
