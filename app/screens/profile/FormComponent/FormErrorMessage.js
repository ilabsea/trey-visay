import React from 'react';
import { ErrorMessage } from '../../../components';

const FormErrorMessage = ({error, visible}) => {
  return <ErrorMessage error={error} visible={visible} style={{lineHeight: 20, marginBottom: -10, marginTop: 4}} />
}

export default FormErrorMessage