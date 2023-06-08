import listMajor from '../screens/MajorSelection/json/list_majors';


const majorHelper = (() => {
  return {
    findByCode
  }

  function findByCode(code) {
    return listMajor.filter(major => major.code == code)[0]
  }
})()

export default majorHelper