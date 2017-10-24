const questions = {
                      areYouGoingToStudyTillGrade12: {type: 'yes_no', rate: {'Yes': 5, 'No': 0, 'Don_Know': 0} },
                      areYourParentsAllowYouToStudyTillGrade12: {type: 'yes_no', rate: {'Yes': 2, 'No': 0, 'Don_Know': 0}},
                      haveYouEverThoughtOfCarrer: {type: 'yes_no', rate: {'Yes': 1, 'No': 0}},
                      carrerName: {type: 'text', rate: 3},
                      howToReachCarreerGoal: {type: 'text', rate: 2},
                      doesParentsAgreeWith: {type: 'yes_no', rate: {'Yes': 2, 'No': 0, 'Don_Know': 0}},
                      everTalkedWithAnyoneAboutCarrerr: {type: 'select_many', rate: {1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6:1}},
                      howToReachJobVacancy: {type: 'text', rate: 1},
                      whoToReachJobVacancy: {type: 'text', rate: 1}
                   }

var PersonalUnderstandingScore = class {

  constructor(data) {
    this.data = data;
  }

  calculate(){
    score = 0;
    for (key in this.data) {
      if(questions[key] != undefined){
        type = questions[key]['type'];
        value = this.data[key];
        if(type == 'yes_no'){
          score = score + questions[key]['rate'][value];
        }else if(type == 'select_many'){
          for(var i=1; i<=value.length; i++){
            score = score + questions[key]['rate'][i];
          }
        }else if(type == 'text'){
          if(value.length > 0){
            score = score + questions[key]['rate'];
          }
        }
      }

    }

    alert('You score '+ score);


  }
};

export default PersonalUnderstandingScore;
