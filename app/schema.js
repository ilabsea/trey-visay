// https://stackoverflow.com/questions/40195371/how-to-organize-react-native-with-realm-project-files
// https://github.com/realm/realm-js/blob/master/examples/ReactExample/components/todo-app.js

'use strict';

import Realm from 'realm';
import User from './data/models/user';
import PersonalUnderstanding from './data/models/personal_understanding';
import arrayInt from './data/models/arrayInt';
import arrayString from './data/models/arrayString';
import Game from './data/models/game';
import GameSubject from './data/models/game_subject';
import Recommendation from './data/models/recommendation';

export default new Realm({schema: [
  User,
  PersonalUnderstanding,
  arrayInt,
  arrayString,
  Game,
  GameSubject,
  Recommendation
]});
