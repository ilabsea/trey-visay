import HighSchools from '../utils/highSchools';
import highSchoolsJson from '../data/json/address/highSchools.json';
import provinces from '../data/json/address/provinces.json';
import districts from '../data/json/address/districts.json';

import characteristicList from '../data/json/characteristic_jobs';

const highSchools = HighSchools;

export default class Migration {
  static migrateSchoolsToCode(oldRealm, newRealm) {
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
  static migrateCareersToCode(oldRealm, newRealm) {
    if (oldRealm.schemaVersion < 4) {
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
}
