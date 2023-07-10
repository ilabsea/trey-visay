import client from "./client";
import User from '../models/User';
import IntelligentQuiz from '../models/IntelligentQuiz';

const endpoint = "/intelligence_quizzes";

export const uploadIntelligenceQuiz = (quizUuid) => {
  const quiz = IntelligentQuiz.findByUuid(quizUuid);
  const user = User.findByUuid(quiz.userUuid);

  const data = {
    intelligence_quiz: {
      user_id: user.serverId,
      quizzed_at: quiz.createdAt,
      intelligence_scores_attributes: getIntelligentScoreAttrs(quiz),
      intelligence_responses_attributes: getIntelligentResponses(quiz),
    }
  }

  return new Promise((resolve, reject) => {
    client.post(endpoint, data).then((res) => {
      if (res.ok) {
        resolve(res);
      } else {
        reject(res);
      }
    })
  })
}

const getIntelligentScoreAttrs = (quiz) => {
  let attributes = [];
  Object.keys(quiz.intelligenceScore).map(type => {
    attributes.push({
      intelligence_category_code: type,
      score: quiz.intelligenceScore[type]
    })
  })
  return attributes;
}

const getIntelligentResponses = (quiz) => {
  let attributes = [];
  Object.keys(quiz.intelligenceResponse).map(type => {
    attributes.push({
      intelligence_question_code: type,
      value: quiz.intelligenceResponse[type]
    })
  })
  return attributes;
}