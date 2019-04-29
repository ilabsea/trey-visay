// https://stackoverflow.com/questions/40195371/how-to-organize-react-native-with-realm-project-files
// https://github.com/realm/realm-js/blob/master/examples/ReactExample/components/todo-app.js

'use strict';

import Realm from 'realm';
import Migration from './migration';

import schema1 from './schemas/schema1';
import schema2 from './schemas/schema2';
import schema3 from './schemas/schema3';

const schemas = [
  { schema: schema1, schemaVersion: 1 },
  { schema: schema1, schemaVersion: 2 },
  { schema: schema1, schemaVersion: 3, migration: Migration.migrateSchoolsToCode },
  { schema: schema2, schemaVersion: 4, migration: Migration.migrateCareersToCode },
  { schema: schema3, schemaVersion: 5 }
]

// the first schema to update to is the current schema version
// since the first schema in our array is at
let nextSchemaIndex = Realm.schemaVersion(Realm.defaultPath);
while (nextSchemaIndex < schemas.length) {
  const migratedRealm = new Realm({...schemas[nextSchemaIndex]});
  nextSchemaIndex += 1;
  migratedRealm.close();
}

export default new Realm(schemas[schemas.length-1]);
