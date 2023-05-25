'use strict';

import Realm from 'realm';

const routes = {
  0: 'PersonalUnderstandingTestScreen',
  1: 'HollandInstructionScreen',
  2: 'HollandTestResultScreen',
  3: 'HollandListDetail'
}

export default class Quiz extends Realm.Object {
  get isDone() {
    return this.step > 2;
  }

  get nextScreen() {
    return routes[this.step + 1];
  }

  get sortedHollandScore() {
    // [["C", 24], ["I", 21], ["R", 21], ["E", 20], ["A", 17], ["S", 17]]
    return Object.entries(this.hollandScore).sort((a,b) => b[1] - a[1]);
  }
}

Quiz.schema = {
  name: 'Quiz',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    userUuid: 'string',
    step: { type: 'int', default: 0 },
    selfUnderstandingReponse: '{}',
    hollandResponse: '{}',
    hollandScore: '{}',
    majorResponse: 'string[]',
    jobResponse: 'string[]',
    majorCode: { type: 'string', optional: true },
    jobCode: { type: 'string', optional: true },
    createdAt: 'date'
  }
}
