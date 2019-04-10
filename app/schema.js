// https://stackoverflow.com/questions/40195371/how-to-organize-react-native-with-realm-project-files
// https://github.com/realm/realm-js/blob/master/examples/ReactExample/components/todo-app.js

'use strict';

import Realm from 'realm';
import User from './data/models/user';
import PersonalUnderstanding from './data/models/personal_understanding';
import arrayInt from './data/models/arrayInt';
import arrayString from './data/models/arrayString';
import Game from './data/models/game';
import GameSubject from './data/models/game_subject';
import Sidekiq from './data/models/sidekiq';
import HighSchools from './utils/highSchools';
import highSchoolsJson from './data/json/address/highSchools.json';
import provinces from './data/json/address/provinces.json';
import districts from './data/json/address/districts.json';

const highSchools = HighSchools;

const schema = [
  User,
  PersonalUnderstanding,
  arrayInt,
  arrayString,
  Game,
  GameSubject,
  Sidekiq
];

function migration3(oldRealm, newRealm) {
  if (oldRealm.schemaVersion < 3) {
    const oldObjects = oldRealm.objects('User');
    const newObjects = newRealm.objects('User');
    for (let i = 0; i < oldObjects.length; i++) {
      let highSchool = highSchools.find(school => school.id == oldObjects[i].highSchoolId);
      if(!highSchool) { continue; }

      let districtCode = highSchoolsJson.find(school => school.code == highSchool.code).parent_code;
      let provinceCode = districtCode ? districts.find(district => district.code == districtCode).parent_code : '';
      newObjects[i].highSchoolCode = highSchool.code;
      newObjects[i].districtCode = districtCode;
      newObjects[i].provinceCode = provinceCode;
    }
  }
}


const schemas = [
  { schema: schema, schemaVersion: 1 },
  { schema: schema, schemaVersion: 2 },
  { schema: schema, schemaVersion: 3, migration: migration3 }
]

// the first schema to update to is the current schema version
// since the first schema in our array is at
let nextSchemaIndex = Realm.schemaVersion(Realm.defaultPath);
while (nextSchemaIndex < schemas.length) {
  const migratedRealm = new Realm({ ...schemas[nextSchemaIndex] });
  nextSchemaIndex += 1;
  migratedRealm.close();
}

export default new Realm(schemas[schemas.length-1]);
