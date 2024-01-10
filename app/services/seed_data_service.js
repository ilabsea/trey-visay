import School from '../models/School'
import Major from '../models/Major'
import JobCluster from '../models/JobCluster'
import Job from '../models/Job'
import Video from '../models/Video'
import CareerWebsite from '../models/CareerWebsite';
import HighSchool from '../models/HighSchool';

export const seedDataToRealm = () => {
  School.getAll().length == 0 && School.seedData()
  Major.getAll().length == 0 && Major.seedData()
  JobCluster.getAll().length == 0 && JobCluster.seedData()
  Job.getAll().length == 0 && Job.seedData()
  Video.getAll().length == 0 && Video.seedData()
  CareerWebsite.getAll().length == 0 && CareerWebsite.seedData()
  HighSchool.getAll().length == 0 && HighSchool.seedData()
}
