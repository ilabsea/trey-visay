const questions = {
                      areYouGoingToStudyTillGrade12: {type: 'yes_no', rate: {'Yes': 5, 'No': 0, 'Don_Know': 0} },
                      areYourParentsAllowYouToStudyTillGrade12: {type: 'yes_no', rate: {'Yes': 2, 'No': 0, 'Don_Know': 0}},
                      haveYouEverThoughtOfCareer: {type: 'yes_no', rate: {'Yes': 1, 'No': 0}},
                      careerName: {type: 'text', rate: 3},
                      howToReachCareerGoal: {type: 'text', rate: 2},
                      doesParentsAgreeWith: {type: 'yes_no', rate: {'Yes': 2, 'No': 0, 'Don_Know': 0}},
                      everTalkedWithAnyoneAboutCareer: {type: 'select_many', rate: {1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6:1}},
                      howToReachJobVacancy: {type: 'text', rate: 1}
                   }

export default class PersonalUnderstandingScore {

  constructor(data) {
    this.data = data || {};
  }

  isInMaySkipQuestions(key) {
    let maySkipQuestions = ['careerName', 'howToReachCareerGoal', 'doesParentsAgreeWith'];

    return (maySkipQuestions.indexOf(key) > -1);
  }

  calculate() {
    let score = 0;

    for (key in this.data) {
      if (!!questions[key]) {
        type = questions[key]['type'];
        value = this.data[key];

        if(this.isInMaySkipQuestions(key)) {
          if (this.getQ3Score() > 0) {
            score = score + this.getScore(key, type, value);
          }
        } else {
          score = score + this.getScore(key, type, value);
        }
      }
    }

    return score;
  }

  getQ3Score() {
    let key = 'haveYouEverThoughtOfCareer';
    let type = questions[key]['type'];
    let value = this.data[key];
    let score = (!!value && this.getScore(key, type, value)) || 0;

    return score;
  }

  getScore(key, type, value) {
    let score = 0;

    if (type == 'yes_no') {
      score = questions[key]['rate'][value];

    } else if(type == 'select_many') {
      for(var i=1; i<=value.length; i++) {
        score = score + questions[key]['rate'][i];
      }
    } else if(type == 'text') {
      if(value.length > 0) {
        score = questions[key]['rate'];
      }
    }

    return score;
  }
};
