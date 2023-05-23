'use strict';

import Realm from 'realm';

export default class Quiz extends Realm.Object {}

Quiz.schema = {
  name: 'Quiz',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    userUuid: 'string',
    isDone: { type: 'bool', default: false },
    step: { type: 'string', optional: true },
    selfUnderstandingReponse: '{}',
    hollandResponse: '{}',
    totalScore: '{}',
    majorCode: { type: 'string', optional: true },
    jobCode: { type: 'string', optional: true },
    createdAt: 'date'
  }
}
