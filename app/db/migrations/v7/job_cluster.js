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
    video_ids: { type: 'string[]', default: [], optional: true },
    display_order: 'int',
    recommendation: 'string?'
  }
}