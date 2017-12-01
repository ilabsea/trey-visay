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
    SocialStudyEthicsAndCitizenship: { type: 'string', optional: true },
    SocialStudyGeography: { type: 'string', optional: true },
    SocialStudyHistory: { type: 'string', optional: true },
    SocialStudyHousework: { type: 'string', optional: true },
    SciencePhysics: { type: 'string', optional: true },
    ScienceChemistry: { type: 'string', optional: true },
    ScienceBiology: { type: 'string', optional: true },
    ScienceEarthAndEnvironment: { type: 'string', optional: true },
    SoftSkillCommunication: { type: 'string', optional: true },
    SoftSkillBehavior: { type: 'string', optional: true },
    SoftSkillBrave: { type: 'string', optional: true },
    SoftSkillConfidence: { type: 'string', optional: true },
    SoftSkillPunctuality: { type: 'string', optional: true },
    SoftSkillTeamwork: { type: 'string', optional: true },
    SoftSkillRespect: { type: 'string', optional: true },
    SoftSkillProblemSolving: { type: 'string', optional: true },
  }
}
