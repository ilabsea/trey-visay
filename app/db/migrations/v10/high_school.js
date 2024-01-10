'use strict';

import Realm from 'realm';

export default class HighSchool extends Realm.Object {}

HighSchool.schema = {
  name: 'HighSchool',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    id: 'string',
    code: 'string',
    label: 'string?',
    parent_code: 'string?',
    updated_at: 'date?',
  }
}
