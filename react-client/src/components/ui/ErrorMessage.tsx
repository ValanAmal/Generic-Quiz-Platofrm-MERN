// components/ui/ErrorMessage.tsx
import React from 'react';

interface ErrorMessageProps {
  message: string | null;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null; // Do not render anything if there is no error message

  return (
    <p className="text-red-500 mt-4 text-center">
      {message}
    </p>
  );
};

export default ErrorMessage;
