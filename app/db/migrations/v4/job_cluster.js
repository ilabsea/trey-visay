'use strict';

import Realm from 'realm';

export default class JobCluster extends Realm.Object {}

JobCluster.schema = {
  name: 'JobCluster',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    id: 'string',
    code: 'string',
    name: 'string',
    videos: { type: 'string[]', default: [], optional: true }
  }
}