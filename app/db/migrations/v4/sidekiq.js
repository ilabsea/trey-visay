'use strict';

import Realm from 'realm';

export default class Sidekiq extends Realm.Object {}

Sidekiq.schema = {
  name: 'Sidekiq',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    paramUuid: 'string',
    modelName: 'string',
    attempt: { type: 'int', default: 0 },
    isDone: { type: 'bool', default: false }
  }
}
