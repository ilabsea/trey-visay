'use strict';

import Realm from 'realm';

export default class PersonalUnderstanding extends Realm.Object {

}

PersonalUnderstanding.schema = {
  name: 'PersonalUnderstanding',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    isGoingToStudyTillGrade12:  {type: 'string', optional: true},
    areParentsAllowYouToStudyTillGrade12: {type: 'string', optional: true},
    everThougthOfCarreer: {type: 'string', optional: true},
    carreerName: {type: 'string', optional: true},
    howToReachCarreerGoal: {type: 'string', optional: true},
    doesParentsAgreeWith: {type: 'string', optional: true},
    everTalkedWithAnyoneAboutCareer: {type: 'list', objectType: 'arrayInt'},
    howToReachJobVacancy: {type: 'string', optional: true},
    whoToReachJobVacancy: {type: 'string', optional: true},
  }
}
