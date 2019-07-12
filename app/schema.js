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

import characteristicList from './data/json/characteristic_jobs';

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

function migrateSchoolsToCode(oldRealm, newRealm) {
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

//migrate personalityCareers from career code to ID
//migrate mostFavorableJobId to mostFavorableJobCode
function migrateCareersToCode(oldRealm, newRealm) {
  if (oldRealm.schemaVersion < 5) {
    const oldObjects = oldRealm.objects('Game');
    const newObjects = newRealm.objects('Game');
    for (let i = 0; i < oldObjects.length; i++) {
      let group = characteristicList.find((obj) => obj.id == oldObjects[i].characteristicId);
      if(!group) { continue; }
      let oldCareersIds = oldObjects[i].personalityCareers.map(obj => obj.value);

      if(!oldCareersIds) { continue; }
      let userCareers = group.careers.filter((item, pos) => {
        return oldCareersIds.includes(item.id)
      });
      newObjects[i].personalityCareers = userCareers.map((obj) => {
        return { value: obj.code };
      })
      let favoriteJob = group.careers.find((obj) => obj.id == oldObjects[i].mostFavorableJobId );
      if(!favoriteJob) { continue; }
      newObjects[i].mostFavorableJobCode = favoriteJob.code;
    }
  }
}

const schemas = [
  { schema: schema, schemaVersion: 1 },
  { schema: schema, schemaVersion: 2 },
  { schema: schema, schemaVersion: 3, migration: migrateSchoolsToCode },
  { schema: schema, schemaVersion: 4 },
  { schema: schema, schemaVersion: 5, migration: migrateCareersToCode },
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
