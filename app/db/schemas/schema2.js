import arrayInt from '../migrations/arrayInt';
import arrayString from '../migrations/arrayString';
import User from '../migrations/v2/user';
import PersonalUnderstanding from '../migrations/v2/personal_understanding';
import Game from '../migrations/v2/game';
import GameSubject from '../migrations/v2/game_subject';
import Sidekiq from '../migrations/v2/sidekiq';

const schema2 = [
  User,
  PersonalUnderstanding,
  arrayInt,
  arrayString,
  Game,
  GameSubject,
  Sidekiq
];

export default schema2;
