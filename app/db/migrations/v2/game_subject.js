'use strict';

import Realm from 'realm';

export default class GameSubject extends Realm.Object {}

GameSubject.schema = {
  name: 'GameSubject',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    games: { type: 'linkingObjects', objectType: 'Game', property: 'gameSubject' },
    khmerReading: { type: 'string', optional: true },
    khmerWriting: { type: 'string', optional: true },
    english: { type: 'string', optional: true },
    math: { type: 'string', optional: true },
    socialStudyEthicsAndCitizenship: { type: 'string', optional: true },
    socialStudyGeography: { type: 'string', optional: true },
    socialStudyHistory: { type: 'string', optional: true },
    sciencePhysics: { type: 'string', optional: true },
    scienceChemistry: { type: 'string', optional: true },
    scienceBiology: { type: 'string', optional: true },
    softSkillCommunication: { type: 'string', optional: true },
    softSkillBrave: { type: 'string', optional: true },
    softSkillTeamwork: { type: 'string', optional: true },
    softSkillProblemSolving: { type: 'string', optional: true },
    softSkillPublicSpeaking: { type: 'string', optional: true },
  }
}
