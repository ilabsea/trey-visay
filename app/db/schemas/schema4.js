import Sidekiq from '../migrations/v4/sidekiq';
import User from '../migrations/v4/user';
import Quiz from '../migrations/v4/quiz';
import School from '../migrations/v4/school';
import DownloadedImage from '../migrations/v4/downloaded_image';
import Major from '../migrations/v4/major';
import Job from '../migrations/v4/job';
import JobCluster from '../migrations/v4/job_cluster';
import Video from '../migrations/v4/video';
import Visit from '../migrations/v4/visit';
import IntelligentQuiz from '../migrations/v4/intelligent_quiz';

const schema4 = [
  Sidekiq,
  User,
  Quiz,
  School,
  DownloadedImage,
  Major,
  Job,
  JobCluster,
  Video,
  Visit,
  IntelligentQuiz,
];

export default schema4;
