import School from '../models/School'

export const seedDataToRealm = () => {
  School.getAll().length == 0 && School.seedData()
}