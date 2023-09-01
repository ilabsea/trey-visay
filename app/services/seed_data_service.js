import School from '../models/School'
import Major from '../models/Major'
import JobCluster from '../models/JobCluster'
import Job from '../models/Job'
import Video from '../models/Video'

export const seedDataToRealm = () => {
  School.getAll().length == 0 && School.seedData()
  Major.getAll().length == 0 && Major.seedData()
  JobCluster.getAll().length == 0 && JobCluster.seedData()
  Job.getAll().length == 0 && Job.seedData()
  Video.getAll().length == 0 && Video.seedData()
}