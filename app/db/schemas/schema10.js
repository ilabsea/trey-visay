import Sidekiq from '../migrations/v4/sidekiq';
import User from '../migrations/v4/user';
import Quiz from '../migrations/v4/quiz';
import School from '../migrations/v7/school';
import DownloadedImage from '../migrations/v4/downloaded_image';
import Major from '../migrations/v5/major';
import Job from '../migrations/v9/job';
import JobCluster from '../migrations/v8/job_cluster';
import Video from '../migrations/v5/video';
import Visit from '../migrations/v4/visit';
import IntelligentQuiz from '../migrations/v4/intelligent_quiz';
import CareerWebsite from '../migrations/v5/career_website';
import HighSchool from '../migrations/v10/high_school';

const schema10 = [
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
  HighSchool,
];

export const migrateClearData = (oldRealm, newRealm) => {
  if (oldRealm.schemaVersion < 12) {
    const schemas = ['Job', 'School'];
    schemas.map(schema => {
      const newObjects = newRealm.objects(schema);
      newRealm.delete(newObjects);
    })
  }
}

export default schema10;
