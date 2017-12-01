'use strict';

import Realm from 'realm';

export default class GamePersonality extends Realm.Object {}

GamePersonality.schema = {
  name: 'GamePersonality',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    games: { type: 'linkingObjects', objectType: 'Game', property: 'gamePersonality' },
    highestGroup: { type: 'string', optional: true },
    group1: { type: 'string[]', optional: true },
    group2: { type: 'string[]', optional: true },
    group3: { type: 'string[]', optional: true },
    group4: { type: 'string[]', optional: true },
    group5: { type: 'string[]', optional: true },
    group6: { type: 'string[]', optional: true },
  }
}
