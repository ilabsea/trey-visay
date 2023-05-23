import arrayInt from '../migrations/arrayInt';
import arrayString from '../migrations/arrayString';
import User from '../migrations/v3/user';
import PersonalUnderstanding from '../migrations/v3/personal_understanding';
import Game from '../migrations/v3/game';
import GameSubject from '../migrations/v3/game_subject';
import PersonalityAssessment from '../migrations/v3/personality_assessment';
import Sidekiq from '../migrations/v3/sidekiq';

const schema3 = [
  User,
  PersonalUnderstanding,
  arrayInt,
  arrayString,
  Game,
  GameSubject,
  PersonalityAssessment,
  Sidekiq
];

export default schema3;
