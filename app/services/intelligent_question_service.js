import intelligent_questions from '../data/json/intelligent_questions.json';
import paginate from '../utils/paginate_util';

export const getQuestions = (page=1) => {
  const pageSize = 7;
  const questions = paginate(intelligent_questions, pageSize, page);
  const isPageEnd = page * pageSize >= intelligent_questions.length;

  return { questions, isPageEnd, page };
}