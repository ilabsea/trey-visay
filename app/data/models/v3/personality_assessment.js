'use strict';

import Realm from 'realm';

export default class PersonalityAssessment extends Realm.Object {}

PersonalityAssessment.schema = {
  name: 'PersonalityAssessment',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    userUuid: 'string',
    isDone: { type: 'bool', default: false },
    step: { type: 'string', optional: true },
    realistic: { type: 'list', objectType: 'arrayString' },
    investigative: { type: 'list', objectType: 'arrayString' },
    artistic: { type: 'list', objectType: 'arrayString' },
    social: { type: 'list', objectType: 'arrayString' },
    enterprising: { type: 'list', objectType: 'arrayString' },
    conventional: { type: 'list', objectType: 'arrayString' },
    createdAt: 'date'
  }
}
