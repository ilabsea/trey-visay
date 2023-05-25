import Sidekiq from '../migrations/v4/sidekiq';
import User from '../migrations/v4/user';
import Quiz from '../migrations/v4/quiz';

const schema4 = [
  Sidekiq,
  User,
  Quiz,
];

export default schema4;
