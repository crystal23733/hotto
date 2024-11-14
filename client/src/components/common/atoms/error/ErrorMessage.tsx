import React from "react";
import ErrorMessageProps from "./props/ErrorMessageProps";
import "../../../../scss/common/error/error-message.scss";

const ErrorMessage: React.FC<ErrorMessageProps> = ({ children }) => {
  return (
    <div className="error-message">
      <p className="help is-danger">{children}</p>
    </div>
  );
};

export default ErrorMessage;
