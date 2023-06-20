'use strict';

import Realm from 'realm';

export default class CollegeMajor extends Realm.Object {}

CollegeMajor.schema = {
  name: 'CollegeMajor',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    id: 'string',       // store the id of the college major from the server
    code: 'string',
    name: 'string',
    personality_type: 'string?',
    general_info: 'string?',
    orien_orientation_subjects: 'string?',
    orien_study_condition: 'string?',
    orien_graduation_condition : 'string?',
    curriculum : 'string?',
    teaching_and_learning_process : 'string?',
    gain_knowledge : 'string?',
    worthy_career : 'string?',
    recommendation : 'string?',
    schools: { type: 'string[]', default: [], optional: true }    // store array of school ID
  }
}