'use strict';

import Realm from 'realm';

export default class GameSubject extends Realm.Object {}

GameSubject.schema = {
  name: 'GameSubject',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    games: { type: 'linkingObjects', objectType: 'Game', property: 'gameSubject' },
    khmerSpeaking: { type: 'string', optional: true },
    khmerListening: { type: 'string', optional: true },
    khmerReading: { type: 'string', optional: true },
    khmerWriting: { type: 'string', optional: true },
    englishSpeaking: { type: 'string', optional: true },
    englishListening: { type: 'string', optional: true },
    englishReading: { type: 'string', optional: true },
    englishWriting: { type: 'string', optional: true },
    mathNumber: { type: 'string', optional: true },
    mathGauge: { type: 'string', optional: true },
    mathGeometry: { type: 'string', optional: true },
    mathStatistics: { type: 'string', optional: true },
    mathAlgebra: { type: 'string', optional: true },
    socialStudyEthicsAndCitizenship: { type: 'string', optional: true },
    socialStudyGeography: { type: 'string', optional: true },
    socialStudyHistory: { type: 'string', optional: true },
    socialStudyHousework: { type: 'string', optional: true },
    sciencePhysics: { type: 'string', optional: true },
    scienceChemistry: { type: 'string', optional: true },
    scienceBiology: { type: 'string', optional: true },
    scienceEarthAndEnvironment: { type: 'string', optional: true },
    softSkillCommunication: { type: 'string', optional: true },
    softSkillBehavior: { type: 'string', optional: true },
    softSkillBrave: { type: 'string', optional: true },
    softSkillConfidence: { type: 'string', optional: true },
    softSkillPunctuality: { type: 'string', optional: true },
    softSkillTeamwork: { type: 'string', optional: true },
    softSkillRespect: { type: 'string', optional: true },
    softSkillProblemSolving: { type: 'string', optional: true },
  }
}
