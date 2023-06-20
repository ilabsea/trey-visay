import School from '../models/School'
import CollegeMajor from '../models/CollegeMajor'

export const seedDataToRealm = () => {
  School.getAll().length == 0 && School.seedData()
  CollegeMajor.getAll().length == 0 && CollegeMajor.seedData()
}