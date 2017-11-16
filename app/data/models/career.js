'use strict';

import Realm from 'realm';

export default class Career extends Realm.Object {}

Career.schema = {
  name: 'Career',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    userUuid: 'string',
    careerByFavorite: {type: 'string', optional: true},
    careerByValue: {type: 'string', optional: true},
    careerByPersonality: {type: 'string', optional: true},
    selectedCareer1: {type: 'string', optional: true},
    selectedCareer2: {type: 'string', optional: true},
    TargetCareer: {type: 'string', optional: true},
    reason: {type: 'string', optional: true},
  }
}
