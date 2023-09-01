'use strict';

import Realm from 'realm';
import Major from '../../../models/Major';
import Job from '../../../models/Job';

const routes = {
  0: 'PersonalUnderstandingTestScreen',
  1: 'HollandInstructionScreen',
  2: 'HollandTestResultScreen',
  3: 'HollandDetailScreen'
}

export default class Quiz extends Realm.Object {
  get isDone() {
    return this.step > 2;
  }

  get nextScreen() {
    return routes[this.step + 1];
  }

  get sortedHollandScore() {
    // [["C", 24], ["I", 21], ["R", 21], ["E", 20], ["A", 17], ["S", 17]]
    return Object.entries(this.hollandScore).sort((a,b) => b[1] - a[1]);
  }

  get sortedPersonalityTypes() {
    return this.sortedHollandScore.map(x => x[0]);
  }

  get majorRoute() {
    return !!this.majorCodeSelected ? 'MajorDetailScreen' : 'MajorSelectMultipleScreen';
  }

  get jobRoute() {
    return !!this.jobCodeSelected ? 'JobDetailScreen' : 'JobSelectMultipleScreen';
  }

  get topPersonalityTypes() {
    return this.sortedHollandScore.slice(0, 3).map(b => b[0]);
  }

  get selectedMajor() {
    return !!this.majorCodeSelected ? Major.findByCode(this.majorCodeSelected) : null;
  }

  get selectedJob() {
    return !!this.jobCodeSelected ? Job.findByCode(this.jobCodeSelected) : null;
  }
}

Quiz.schema = {
  name: 'Quiz',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    userUuid: 'string',
    step: { type: 'int', default: 0 },
    // selfUnderstandingResponse: { q1: "", q2: "", q3: "", q4: "", q4_1: "", q5: ""}
    selfUnderstandingResponse: '{}',
    // hollandResponse: { R_01: 1, I_01: 1, A_01: 1, S_01: 3, ..., C_07: 5 }
    hollandResponse: '{}',
    // hollandScore: { R: 84, I: 42, A: 43, S: 50, E: 46, C: 90 }
    hollandScore: '{}',
    // majorCodeSelections: ["182150", "182159", "182154"]
    majorCodeSelections: 'string[]',
    // jobCodeSelections: ["123456", "789012", "345678"]
    jobCodeSelections: 'string[]',
    majorCodeSelected: { type: 'string', optional: true },
    jobCodeSelected: { type: 'string', optional: true },
    majorSelectedAt: { type: 'date', optional: true },
    jobSelectedAt: { type: 'date', optional: true },
    serverId: { type: 'string', optional: true },
    createdAt: 'date',
    selfUnderstandingScore: { type: 'int', default: 0 }
  }
}
