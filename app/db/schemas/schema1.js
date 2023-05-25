import arrayInt from '../migrations/arrayInt';
import arrayString from '../migrations/arrayString';
import User from '../migrations/v1/user';
import PersonalUnderstanding from '../migrations/v1/personal_understanding';
import Game from '../migrations/v1/game';
import GameSubject from '../migrations/v1/game_subject';
import Sidekiq from '../migrations/v1/sidekiq';

const schema1 = [
  User,
  PersonalUnderstanding,
  arrayInt,
  arrayString,
  Game,
  GameSubject,
  Sidekiq
];

export default schema1;
