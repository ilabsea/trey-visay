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