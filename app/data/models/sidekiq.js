'use strict';

import Realm from 'realm';

export default class Sidekiq extends Realm.Object {}

Sidekiq.schema = {
  name: 'Sidekiq',
  primaryKey: 'paramUuid',
  properties: {
    paramUuid: 'string',
    tableName: 'string',
    version: 'string',
    attempt: { type: 'int', default: 0 }
  }
}
