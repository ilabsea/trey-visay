'use strict';

import Realm from 'realm';
import DownloadedImage from '../../../models/DownloadedImage';

export default class School extends Realm.Object {
  get logoSource() {
    return DownloadedImage.getImagePath(JSON.parse(this.logo).url)
  }
}

School.schema = {
  name: 'School',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    id: 'string?',
    name: 'string',
    address: 'string',
    province: 'string?',
    phone_numbers: 'string?',
    faxes: 'string?',
    emails: 'string?',
    website: 'string?',
    mailbox: 'string?',
    category: 'string',
    code: 'string?',
    kind: 'int?',
    logo: 'string?',
    departments: 'string'
  }
}