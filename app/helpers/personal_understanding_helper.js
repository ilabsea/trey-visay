import questions from '../screens/PersonalUnderstanding/json/list_questions';
import { SELECT_ONE, SELECT_MULTIPLE, TEXT } from '../constants/form_constant';

const personalUnderstandingHelper = (() => {
  return {
    isQuestionVisible,
    isQuestionVisibleByCode,
    getTotalScore,
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

  function getTotalScore(answers) {
    let score = 0;
    Object.keys(answers).map((key, index) => {
      const answer = answers[key];
      if (questions[index].type == TEXT && !!answer)
        score += 1;
      else if (questions[index].type == SELECT_ONE)
        score += questions[index].options.filter(option => option.value == answer)[0].score;
      else if (questions[index].type == SELECT_MULTIPLE && answer.length > 0)
        score += 1;
    })
    return score;
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