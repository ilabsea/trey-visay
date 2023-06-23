import School from '../models/School'
import CollegeMajor from '../models/CollegeMajor'
import JobCluster from '../models/JobCluster'
import Job from '../models/Job'

export const seedDataToRealm = () => {
  School.getAll().length == 0 && School.seedData()
  CollegeMajor.getAll().length == 0 && CollegeMajor.seedData()
  JobCluster.getAll().length == 0 && JobCluster.seedData()
  Job.getAll().length == 0 && Job.seedData()
}