import questions from '../screens/PersonalUnderstanding/json/list_questions';

const personalUnderstandingHelper = (() => {
  return {
    isQuestionVisible
  }

  function isQuestionVisible(question, formValues) {
    const {relevant} = question;
    if (!relevant) return true

    const operators = {
      "=": "=="
    };
    const parentQuestionCode = relevant.split('||')[0];
    const operator = operators[relevant.split('||')[1]];
    const relevantValue = relevant.split('||')[2];
    const parentQuestion = questions.filter(item => item.code == parentQuestionCode)[0];
    if (!parentQuestion)
      return false

    const parentValue = formValues[parentQuestion.code];
    return eval(`'${parentValue}' ${operator} '${relevantValue}'`)
  }
})()

export default personalUnderstandingHelper;