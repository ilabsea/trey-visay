import Sidekiq from '../migrations/v4/sidekiq';
import User from '../migrations/v4/user';
import Quiz from '../migrations/v4/quiz';
import School from '../migrations/v4/school';
import DownloadedImage from '../migrations/v4/downloaded_image';

const schema4 = [
  Sidekiq,
  User,
  Quiz,
  School,
  DownloadedImage
];

export default schema4;
