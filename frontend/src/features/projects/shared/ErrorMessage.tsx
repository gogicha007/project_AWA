type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <div>ErrorMessage: {message}</div>;
};

export default ErrorMessage;
