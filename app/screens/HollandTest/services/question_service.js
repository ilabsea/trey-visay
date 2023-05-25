import list_questions from '../json/list_questions';
import paginate from '../../../utils/paginate_util';
import * as Yup from "yup";

export const getQuestions = (page=1) => {
  const pageSize = 6;
  const questions = paginate(list_questions, pageSize, page);
  const isPageEnd = page * pageSize >= list_questions.length;

  return { questions, isPageEnd, page };
}

export const getForm = (questions, responses) => {
  // Form validation
  let validations = {};
  for(let i=0; i<questions.length; i++) {
    validations[questions[i].code] = Yup.string().required("សូមជ្រើសរើស");
  }
  const validationSchema = Yup.object().shape(validations);

  // Form initial value
  const initialValues = {};
  for(let i=0; i<questions.length; i++) {
    initialValues[questions[i].code] = responses[questions[i].code] || "";
  }

  return { validationSchema, initialValues }
}

export const getHollandScore = (values) => {
  const columns = ['R', 'I', 'A', 'S', 'E', 'C'];

  const sumValue = (values, code) => {
    let total = 0;

    for(i=0; i<7; i++) {
      total += values[`${code}_0${i+1}`];
    }

    return total;
  }

  const hash = {};

  for(let i=0; i<columns.length; i++) {
    hash[columns[i]] = sumValue(values, columns[i]);
  }

  return hash;
}
