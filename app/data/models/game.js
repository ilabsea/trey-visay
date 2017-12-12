'use strict';

import Realm from 'realm';

export default class Game extends Realm.Object {}

Game.schema = {
  name: 'Game',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    users: { type: 'linkingObjects', objectType: 'User', property: 'game' },
    isDone: { type: 'bool', default: false },
    // personalUnderstandings: { type: 'list', objectType: 'PersonalUnderstanding' },
    // careerPlanning: { type: 'CareerPlanning' },
    // gameSubject: { type: 'GameSubject', optional:  true },
    // gameValue: { type: 'GameValue', optional:  true },
    // gamePersonality: { type: 'GamePersonality', optional:  true }
  }
}
