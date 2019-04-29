import arrayInt from '../../data/models/arrayInt';
import arrayString from '../../data/models/arrayString';
import User from '../../data/models/v3/user';
import PersonalUnderstanding from '../../data/models/v3/personal_understanding';
import Game from '../../data/models/v3/game';
import GameSubject from '../../data/models/v3/game_subject';
import PersonalityAssessment from '../../data/models/v3/personality_assessment';
import Sidekiq from '../../data/models/v3/sidekiq';

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
