'use strict';

import Realm from 'realm';

export default class Job extends Realm.Object {}

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
    general_description: 'string?',
    jd_main_task: 'string?',
    jd_environment: 'string?',
    jd_technology_skill: 'string?',
    edu_education_level: 'string?',
    edu_high_school_supported_subject: 'string?',
    edu_higher_education_skill: 'string?',
    qua_supported_knowledge: 'string?',
    qua_supported_skill: 'string?',
    qua_supported_capacity: 'string?',
    qua_characteristic_of_job: 'string?',
    info_job_market: 'string?',
    info_similar_job: 'string?',
    logo: 'string?',
    videos: { type: 'string[]', default: [], optional: true }
  }
}