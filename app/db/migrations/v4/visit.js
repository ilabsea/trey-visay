'use strict';

import Realm from 'realm';

export default class Visit extends Realm.Object {}

Visit.schema = {
  name: 'Visit',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    user_id: 'string?',
    visit_date: 'date',
    name: 'string',
    code: 'string',
    parent_code: 'string?',
    pageable_id: 'string?',
    pageable_type: 'string'
  }
}