import React from 'react';

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return (
    <p>
      Please enter another query! <b>{error}</b>
    </p>
  );
};

export default ErrorMessage;

type ErrorMessageProps = {
  error: string;
};
