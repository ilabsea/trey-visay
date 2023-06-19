import Sidekiq from '../migrations/v4/sidekiq';
import User from '../migrations/v4/user';
import Quiz from '../migrations/v4/quiz';
import School from '../migrations/v4/school';

const schema4 = [
  Sidekiq,
  User,
  Quiz,
  School
];

export default schema4;
