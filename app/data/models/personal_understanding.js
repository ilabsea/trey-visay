'use strict';

import Realm from 'realm';

export default class PersonalUnderstanding extends Realm.Object {}

PersonalUnderstanding.schema = {
  name: 'PersonalUnderstanding',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    userUuid: 'string',
    areYouGoingToStudyTillGrade12:  {type: 'string', optional: true},
    areYourParentsAllowYouToStudyTillGrade12: {type: 'string', optional: true},
    haveYouEverThoughtOfCareer: {type: 'string', optional: true},
    careerName: {type: 'string', optional: true},
    howToReachCareerGoal: {type: 'string', optional: true},
    doesParentsAgreeWith: {type: 'string', optional: true},
    everTalkedWithAnyoneAboutCareer: {type: 'list', objectType: 'arrayInt'},
    howToReachJobVacancy: {type: 'string', optional: true},
    score: {type: 'string', optional: true},
    games: { type: 'linkingObjects', objectType: 'Game', property: 'personalUnderstandings' }
  }
}
