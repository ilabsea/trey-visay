'use strict';

import Realm from 'realm';

export default class Game extends Realm.Object {}

Game.schema = {
  name: 'Game',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    users: { type: 'linkingObjects', objectType: 'User', property: 'games' },
    isDone: { type: 'bool', default: false },
    step: { type: 'string', optional: true },
    characteristicId: { type: 'int', optional: true },
    characteristicEntries: { type: 'list', objectType: 'arrayString' },
    personalityCareers: { type: 'list', objectType: 'arrayInt' },
    mostFavorableJobId: { type: 'int', optional: true },
    goalCareer: { type: 'string', optional: true },
    reason: { type: 'string', optional: true },
    voiceRecord: { type: 'string', optional: true },
    personalUnderstandings: { type: 'list', objectType: 'PersonalUnderstanding' },
    gameSubject: { type: 'GameSubject', optional:  true },
    createdAt: 'date'
  }
}
