import Visit from '../models/Visit';
import client from "./client";

export const uploadVisit = (visitUuid) => {
  console.log('== All visit = ', Visit.getAll())

  const visit = Visit.findByUuid(visitUuid);

  console.log('**** Visit API = ', visit)

  const data = {
    visit: {
      user_id: visit.user_id,
      visit_date: visit.visit_date,
      pageable_id: visit.pageable_id,
      pageable_type: visit.pageable_type,
      page_attributes: {
        code: visit.code,
        name: visit.name,
        parent_code: visit.parent_code,
      },
    }
  };

  console.log('== updated visit data = ', data)

  client.post('/visits', data).then((res) => {
    if (res.ok) {
      console.log('== upload visit success = ', res);
      // Todo: remove the uploaded visit
    }
    else {
      console.log('== upload visit failed = ', res);

    }
  });
}