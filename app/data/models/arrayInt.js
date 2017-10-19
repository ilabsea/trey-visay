'use strict';

import Realm from 'realm';

export default class arrayInt extends Realm.Object {

}
arrayInt.schema = {
  name: 'arrayInt',
  properties: { value: 'int' }
};
