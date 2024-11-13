import AlertButtonProps from "client/src/pipes/interface/common/button/alertButtonProps.interface";
import React from "react";

const AlertButton: React.FC<AlertButtonProps> = ({
  label,
  onClick,
  type = "primary",
}) => {
  return (
    <button
      className={`button ${type === "primary" ? "is-primary" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default AlertButton;
