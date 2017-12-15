'use strict';

import Realm from 'realm';

export default class Recommendation extends Realm.Object {}

Recommendation.schema = {
  name: 'Recommendation',
  properties: {
    careerUuid: 'string',
    careerName: 'string',
    recommendation: { type: 'string', optional: true }
  }
}
