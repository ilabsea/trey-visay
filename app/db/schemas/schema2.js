import arrayInt from '../../data/models/arrayInt';
import arrayString from '../../data/models/arrayString';
import User from '../../data/models/v2/user';
import PersonalUnderstanding from '../../data/models/v2/personal_understanding';
import Game from '../../data/models/v2/game';
import GameSubject from '../../data/models/v2/game_subject';
import Sidekiq from '../../data/models/v2/sidekiq';

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
