import {Platform} from 'react-native';
import Visit from '../models/Visit';
import User from '../models/User';
import client from "./client";

export const uploadVisit = (visitUuid) => {
  const visit = Visit.findByUuid(visitUuid);
  if (!visit) return;

  const getDeviceOS = () => {
    if (Platform.OS != 'ios' && Platform.OS != 'android')
      return 'other';

    return Platform.OS;
  }

  const getUserId = () => {
    if (!visit.user_uuid) return 0;

    const user = User.findByUuid(visit.user_uuid)
    return !user ? 0 : user.serverId;
  }

  const data = {
    visit: {
      user_id: getUserId(),
      visit_date: visit.visit_date,
      pageable_id: visit.pageable_id,
      pageable_type: visit.pageable_type,
      device_os: getDeviceOS(),
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