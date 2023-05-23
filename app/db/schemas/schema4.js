import Sidekiq from '../migrations/v4/sidekiq';
import User from '../migrations/v4/user';
import Quiz from '../migrations/v4/quiz';
// import HollandResponse from '../migrations/v4/holland_response';
// import SelfUnderstandingResponse from '../migrations/v4/self_understanding_response';

const schema4 = [
  Sidekiq,
  User,
  Quiz,
  // SelfUnderstandingResponse,
  // HollandResponse
];

export default schema4;
