'use strict';

import Realm from 'realm';

export default class Recommendation extends Realm.Object {}

Recommendation.schema = {
  name: 'Recommendation',
  properties: {
    career1: 'string',
    recommendation1: 'string',
    career2: 'string',
    recommendation2: 'string'
  }
}
