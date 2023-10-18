import Sidekiq from '../migrations/v4/sidekiq';
import User from '../migrations/v4/user';
import Quiz from '../migrations/v4/quiz';
import School from '../migrations/v5/school';
import DownloadedImage from '../migrations/v4/downloaded_image';
import Major from '../migrations/v5/major';
import Job from '../migrations/v6/job';
import JobCluster from '../migrations/v4/job_cluster';
import Video from '../migrations/v5/video';
import Visit from '../migrations/v4/visit';
import IntelligentQuiz from '../migrations/v4/intelligent_quiz';
import CareerWebsite from '../migrations/v5/career_website';

const schema5 = [
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
  CareerWebsite,
];

export default schema5;
