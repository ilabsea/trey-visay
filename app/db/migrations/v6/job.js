'use strict';

import Realm from 'realm';
import JobCluster from '../../../models/JobCluster';
import DownloadedImage from '../../../models/DownloadedImage';
import Images from '../../../assets/images_js/careers_images';
import fileUtil from '../../../utils/file_util';

export default class Job extends Realm.Object {
  get logoSource() {
    let logo = !!this.logo ? this.logo : JobCluster.findById(this.job_cluster_id).logo;
    if (!logo)
      return Images.default;

    const downloadedLogo = DownloadedImage.getImagePath(logo);
    if (!!downloadedLogo)
      return {uri: downloadedLogo};

    const filename = fileUtil.getFilenameFromUrl(logo).split('.')[0];
    return !!Images[filename] ? Images[filename] : Images.default;
  }
}

Job.schema = {
  name: 'Job',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    id: 'string',
    code: 'string',
    name: 'string',
    value: 'string',
    personality_type: 'string?',
    job_cluster_name: 'string?',
    job_cluster_id: 'string?',
    job_cluster_code: 'string?',
    general_description: 'string?',
    jd_main_task: 'string?',
    jd_environment: 'string?',
    jd_technology_skill: 'string?',
    edu_education_level: 'string?',
    edu_subjects_at_high_school: 'string?',
    edu_majors_at_university: 'string?',
    personal_competency_knowledge: 'string?',
    personal_competency_skill: 'string?',
    personal_competency_ability: 'string?',
    logo: 'string?',
    video_ids: { type: 'string[]', default: [], optional: true },
    school_ids: { type: 'int[]', default: [], optional: true },
    updated_at: 'date?'
  }
}