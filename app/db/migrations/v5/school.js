'use strict';

import Realm from 'realm';

export default class School extends Realm.Object {}

School.schema = {
  name: 'School',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    id: 'int?',
    name: 'string',
    address: 'string',
    province: 'int?',
    phone_numbers: 'string?',
    faxes: 'string?',
    emails: 'string?',
    website: 'string?',
    mailbox: 'string?',
    category: 'string',
    code: 'string?',
    kind: 'string?',
    logo: 'string?',
    departments: 'string',
    updated_at: 'date?'
  }
}