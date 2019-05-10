import React from 'react';
import { SubmissionError } from 'redux-form'
import PersonalUnderstandingScore from './PersonalUnderstandingScore'

function submit(values, callback){
  formValues = parseFormValue(values);
  score = new PersonalUnderstandingScore(formValues).calculate();

  callback;
  // return sleep(1000) // simulate server latency
  //   .then(() => {
  //     if (![ 'john', 'paul', 'george', 'ringo' ].includes(values.username)) {
  //       throw new SubmissionError({ username: 'User does not exist', _error: 'Login failed!' })
  //     } else if (values.password !== 'redux-form') {
  //       throw new SubmissionError({ password: 'Wrong password', _error: 'Login failed!' })
  //     } else {
  //       window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
  //     }
  //   })
};


function parseFormValue(values){
  values['uuid'] = '123';
  if(values['everTalkedWithAnyoneAboutCareer']) {
    values['everTalkedWithAnyoneAboutCareer'] = values['everTalkedWithAnyoneAboutCareer'].map(function(i){ return {value: i }; } );
  }

  return values;
};

export default submit
