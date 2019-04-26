import arrayInt from '../../data/models/arrayInt';
import arrayString from '../../data/models/arrayString';
import User from '../../data/models/v1/user';
import PersonalUnderstanding from '../../data/models/v1/personal_understanding';
import Game from '../../data/models/v1/game';
import GameSubject from '../../data/models/v1/game_subject';
import Sidekiq from '../../data/models/v1/sidekiq';

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
