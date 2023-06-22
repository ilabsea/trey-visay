'use strict';

import Realm from 'realm';

export default class Video extends Realm.Object {}

Video.schema = {
  name: 'Video',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    id: 'string',
    code: 'string',
    name: 'string',
    url: 'string',
    author: 'string?'
  }
}