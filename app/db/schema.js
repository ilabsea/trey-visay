// https://stackoverflow.com/questions/40195371/how-to-organize-react-native-with-realm-project-files
// https://github.com/realm/realm-js/blob/master/examples/ReactExample/components/todo-app.js

'use strict';

import Realm from 'realm';
import Migration from './migration';

import schema1 from './schemas/schema1';
import schema2 from './schemas/schema2';
import schema3 from './schemas/schema3';
import schema4 from './schemas/schema4';
import schema5 from './schemas/schema5';
import schema6 from './schemas/schema6';
import schema7 from './schemas/schema7';
import schema8, {migrateClearData} from './schemas/schema8';
import schema9, {migrateClearJobData} from './schemas/schema9';

const schemas = [
  { schema: schema1, schemaVersion: 1 },
  { schema: schema1, schemaVersion: 2 },
  { schema: schema1, schemaVersion: 3, onMigration: Migration.migrateSchoolsToCode },
  { schema: schema2, schemaVersion: 4, onMigration: Migration.migrateCareersToCode },
  { schema: schema3, schemaVersion: 5 },
  { schema: schema4, schemaVersion: 6 },
  { schema: schema5, schemaVersion: 7 },
  { schema: schema6, schemaVersion: 8 },
  { schema: schema7, schemaVersion: 9 },
  { schema: schema8, schemaVersion: 10, onMigration: migrateClearData },
  { schema: schema9, schemaVersion: 11, onMigration: migrateClearJobData },
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
