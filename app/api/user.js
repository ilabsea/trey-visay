import client from "./client";
import { Platform } from 'react-native';
import { getUniqueId, isTablet, getVersion, getSystemName,  getSystemVersion } from 'react-native-device-info';
import User from '../models/User';

const endpoint = "/users";

export const uploadUser = async(userUuid) => {
  const user = User.findByUuid(userUuid);

  const data = {
    full_name: user.fullName,
    sex: user.sex,
    date_of_birth: user.dateOfBirth,
    phone_number: user.phoneNumber,
    grade: user.grade,
    province_id: user.provinceCode,
    district_id: user.districtCode,
    commune_code: user.communeCode,
    class_group: (user.classGroup + '').toLowerCase(),
    high_school_code: user.highSchoolCode,
    middle_school_id: user.middleSchoolId,
    registered_at: user.createdAt,
    device_id: await getUniqueId(),
    device_type: isTablet() ? "tablet" : "mobile",
    device_os: Platform.OS,
    app_version: getVersion()
  }

  return new Promise((resolve, reject) => {
    client.post(endpoint, data).then((res) => {
      if (res.ok) {
        User.write(() => { user.serverId = res.data.id })

        resolve(res)
      } else {
        reject(res)
      }
    })
  })
};

export default {
  uploadUser
};
