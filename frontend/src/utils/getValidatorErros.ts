import { ValidationError } from 'yup';

interface Erros {
  [key: string]: string;
}

export default function getValidatorErrors(errors: ValidationError): Erros {
  const errorValitatios: Erros = {};

  errors.inner.forEach(error => {
    errorValitatios[error.path || ''] = error.message;
  });

  return errorValitatios;
}