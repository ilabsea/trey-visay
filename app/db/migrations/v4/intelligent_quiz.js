'use strict'

import Realm from 'realm';

export default class IntelligentQuiz extends Realm.Object {
  get sortedIntelligenceScore() {
    return Object.entries(this.intelligenceScore).sort((a,b) => b[1] - a[1]);
  }
}

IntelligentQuiz.schema = {
  name: 'IntelligentQuiz',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    userUuid: 'string',
    intelligenceScore: '{}',  // {intelligence_category_code: value} <=> {"int_03": 4, "int_03": 4}
    intelligenceResponse: '{}', // {intelligence_question_code: value} <=> {"q_01": 4, "q_02": 4}
    createdAt: 'date',
    finishedAt: 'date?'
  }
}