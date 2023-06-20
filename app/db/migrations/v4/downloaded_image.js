'use strict';

import Realm from 'realm'

export default class DownloadedImage extends Realm.Object {}

DownloadedImage.schema = {
  name: 'DownloadedImage',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    name: 'string'
  }
}