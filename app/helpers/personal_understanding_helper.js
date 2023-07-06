import questions from '../screens/PersonalUnderstanding/json/list_questions';

const personalUnderstandingHelper = (() => {
  return {
    isQuestionVisible,
    isQuestionVisibleByCode,
  }

  function isQuestionVisible(question, formValues) {
    const {relevant} = question;
    if (!relevant) return true

    const {operator, relevantValue} = _getRelevantCondition(relevant);
    const parentQuestionCode = relevant.split('||')[0];
    const parentQuestion = questions.filter(item => item.code == parentQuestionCode)[0];
    if (!parentQuestion)
      return false

    const parentValue = formValues[parentQuestion.code];
    return eval(`'${parentValue}' ${operator} '${relevantValue}'`)
  }

  function isQuestionVisibleByCode(code, parentValue) {
    const question = _findQuestionByCode(code);
    const {operator, relevantValue} = _getRelevantCondition(question.relevant);
    return eval(`'${parentValue}' ${operator} '${relevantValue}'`)
  }

  function _getRelevantCondition(relevant) {
    const operators = {
      "=": "=="
    }
    return { operator: operators[relevant.split('||')[1]], relevantValue: relevant.split('||')[2] }
  }

  function _findQuestionByCode(code) {
    return questions.filter(q => q.code == code)[0]
  }
})()

export default personalUnderstandingHelper;