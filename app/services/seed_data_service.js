import School from '../models/School'
import CollegeMajor from '../models/CollegeMajor'
import Job from '../models/Job'

export const seedDataToRealm = () => {
  School.getAll().length == 0 && School.seedData()
  CollegeMajor.getAll().length == 0 && CollegeMajor.seedData()
  Job.getAll().length == 0 && Job.seedData()
}