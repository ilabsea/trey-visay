'use strict';

import Realm from 'realm';

export default class PersonalUnderstanding extends Realm.Object {

}

PersonalUnderstanding.schema = {
  name: 'PersonalUnderstanding',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    isGoingToStudyTillGrade12: 'string',
    areParentsAllowYouToStudyTillGrade12: 'string',
    everThougthOfCarreer: 'string',
    carreerName: 'string',
    howToReachCarreerGoal: 'string',
    doesParentsAgreeWith: 'string',
    everTalkedWithAnyoneAboutCarrerr: 'string',
    howToReachJobVacancy: 'string',
    whoToReachJobVacancy: 'string',
  }
}
