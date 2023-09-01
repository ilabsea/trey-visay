import client from "./client";
import { Platform } from 'react-native';
import { getUniqueId, isTablet, getVersion, getSystemName,  getSystemVersion } from 'react-native-device-info';
import User from '../models/User';
import Quiz from '../models/Quiz';
import Job from '../models/Job';

const endpoint = "/holland_quizzes";

// =============================================
const self_understanding_responses_attributes = (quiz) => {
  const attributes = []
  const questionCodes = Object.keys(quiz.selfUnderstandingResponse);

  for(let i = 0; i < questionCodes.length; i++) {
    attributes.push({
      self_understanding_question_code: questionCodes[i],
      value: quiz.selfUnderstandingResponse[questionCodes[i]]
    })
  }

  return attributes;
}

const holland_responses_attributes = (quiz) => {
  let attributes = []
  let questionCodes = Object.keys(quiz.hollandResponse);

  for(let i = 0; i < questionCodes.length; i++) {
    attributes.push({
      holland_question_code: questionCodes[i],
      value: quiz.hollandResponse[questionCodes[i]]
    })
  }

  return attributes;
}

const holland_major_responses_attributes = (quiz) => {
  let attributes = []
  let codes = Object.values(quiz.majorCodeSelections);

  for(let i = 0; i < codes.length; i++) {
    attributes.push({
      major_code: codes[i],
      selected: codes[i] == quiz.majorCodeSelected
    })
  }

  return attributes;
}

const holland_job_responses_attributes = (quiz) => {
  let attributes = []
  let codes = Object.values(quiz.jobCodeSelections);

  for(let i = 0; i < codes.length; i++) {
    attributes.push({
      job_code: codes[i],
      selected: codes[i] == quiz.jobCodeSelected
    })
  }

  return attributes;
}

const holland_scores_attributes = (quiz) => {
  let attributes = []
  let personalityTypes = Object.keys(quiz.hollandScore);

  for(let i = 0; i < personalityTypes.length; i++) {
    attributes.push({
      personality_type: personalityTypes[i],
      score: quiz.hollandScore[personalityTypes[i]]
    })
  }

  return attributes;
}

// =============================================

export const uploadHollandQuiz = (quizUuid) => {
  const quiz = Quiz.findByUuid(quizUuid);
  const user = User.findByUuid(quiz.userUuid);

  const data = {
    holland_quiz: {
      user_id: user.serverId,
      quizzed_at: quiz.createdAt,
      personality_type_results: quiz.sortedPersonalityTypes,
      self_understanding_responses_attributes: self_understanding_responses_attributes(quiz),
      holland_scores_attributes: holland_scores_attributes(quiz),
      holland_responses_attributes: holland_responses_attributes(quiz),
      self_understanding_score: quiz.selfUnderstandingScore,
    }
  }

  return new Promise((resolve, reject) => {
    client.post(endpoint, data).then((res) => {
      if (res.ok) {
        Quiz.write(() => { quiz.serverId = res.data.id });

        resolve(res);
      } else {
        reject(res);
      }
    })
  })
};

export const uploadMajorResponse = (quizUuid) => {
  const quiz = Quiz.findByUuid(quizUuid);
  const data = { holland_quiz: { holland_major_responses_attributes: holland_major_responses_attributes(quiz) } }

  return client.put(`/holland_quizzes/${quiz.serverId}`, data);
}

export const uploadJobResponse = (quizUuid) => {
  const quiz = Quiz.findByUuid(quizUuid);
  const data = { holland_quiz: { holland_job_responses_attributes: holland_job_responses_attributes(quiz) } }

  return client.put(`/holland_quizzes/${quiz.serverId}`, data);
}

export default {
  uploadHollandQuiz,
  uploadMajorResponse,
  uploadJobResponse
};
