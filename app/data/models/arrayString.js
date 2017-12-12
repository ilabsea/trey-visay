'use strict';

import Realm from 'realm';

export default class arrayString extends Realm.Object {

}
arrayString.schema = {
  name: 'arrayString',
  properties: { value: 'string' }
};
