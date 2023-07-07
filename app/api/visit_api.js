import Visit from '../models/Visit';
import client from "./client";

export const uploadVisit = (visitUuid) => {
  const visit = Visit.findByUuid(visitUuid);
  if (!visit) return;

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

  return new Promise((resolve, reject) => {
    client.post('/visits', data).then((res) => {
      if (res.ok) {
        Visit.delete(visitUuid);       // delete the visit from realm after submit server successfully
        resolve(res);
      }
      else
        reject(res);
    });
  });
}