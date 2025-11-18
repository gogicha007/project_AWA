type ErrorMessageProps = {
  message: { location: string | null; section: string | null };
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <>
      {message.location && <div>{message.location}</div>}
      {message.section && <div>{message.section}</div>}
    </>
  );
};

export default ErrorMessage;
