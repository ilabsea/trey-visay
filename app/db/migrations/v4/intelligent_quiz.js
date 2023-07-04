'use strict'

import Realm from 'realm';

export default class IntelligentQuiz extends Realm.Object {}

IntelligentQuiz.schema = {
  name: 'IntelligentQuiz',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    userUuid: 'string',
    // response: { R_01: 1, I_01: 1, A_01: 1, S_01: 3, ..., C_07: 5 }
    response: '{}',
    // score: { R: 84, I: 42, A: 43, S: 50, E: 46, C: 90 }
    score: '{}',
    serverId: { type: 'string', optional: true },
    isDone: { type: 'bool', default: false },
    createdAt: 'date'
  }
}