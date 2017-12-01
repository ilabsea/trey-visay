'use strict';

import Realm from 'realm';

export default class CareerPlanning extends Realm.Object {}

CareerPlanning.schema = {
  name: 'CareerPlanning',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    games: { type: 'linkingObjects', objectType: 'Game', property: 'careerPlanning' },
    userUuid: 'string',
    step: { type: 'string', optional: true },
    favoriteCareers: { type: 'string[]', optional: true },
    valueCareers: { type: 'string[]', optional: true },
    personalityCareers: { type: 'string[]', optional: true },
    recommendation: { type: 'list', objectType: 'Recommendation'},
    goalCareer: 'string',
    reason: 'string'
  }
}
