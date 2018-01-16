// totalCount is totalEntries
// pageCount is total items in the current page

import { random, min, times } from 'lodash';
import schoolList from '../data/json/schools';

const perPage = 7;
const majors = schoolList


export default {
  getSchools(page, option={}) {
    return new Promise(resolve => {
      setTimeout(() => {
        let list = schoolList;
        if (!!option.category) {
          list = list.filter(school => school.category == option.category);
        }

        if (!!option.province) {
          list = list.filter(school => school.province == option.province);
        }

        if (!!option.major) {
          list = list.filter((school) => {
            let departments = school.departments.filter((department) => department.majors.includes(option.major));
            return !!departments.length;
          });
        }

        const totalCount = list.length;
        const pageCount = min([totalCount - (page - 1) * perPage, perPage]);
        const pagination = { page, perPage, pageCount, totalCount };

        let offset = (page - 1) * perPage;
        let endPoint = page * perPage;
        let provinces = [...new Set(list.map(school => school.province))];
        const records = list.slice(offset, endPoint);

        resolve({ pagination, records, provinces });
      }, random(100, 500))
    })
  },
  getProvinces(category) {
    return new Promise(resolve => {
      let list = schoolList;
      if (!!category) {
        list = list.filter(school => school.category == category);
      }

      let provinces = [...new Set(list.map(school => school.province))];

      resolve({ provinces });
    })
  }
}
