import React from 'react';

import RadioGroup from './RadioGroup';
import TextInput from './TextInput';
import CheckboxGroup from './CheckboxGroup';
import { SELECT_ONE, SELECT_MULTIPLE, TEXT } from '../../constants/form_constant';

export default FormFieldComponent = ({question, questions}) => {
  const renderFormField = () => {
    switch (question.type) {
      case SELECT_ONE:
        return <RadioGroup question={question} />
        break;
      case SELECT_MULTIPLE:
        return <CheckboxGroup question={question} />
        break;
      case TEXT:
        return <TextInput question={question} />
        break;
    }
  }
  return renderFormField(question);
}
