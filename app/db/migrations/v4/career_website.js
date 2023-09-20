'use strict';

import Realm from 'realm';

export default class CareerWebsite extends Realm.Object {}

CareerWebsite.schema = {
  name: 'CareerWebsite',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    id: 'string?',      // ID of the career website on the server-side
    name: 'string',
    description: 'string',
    url: 'string',
    logo: 'string?'
  }
}