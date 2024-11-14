import ButtonProps from "client/src/pipes/interface/common/button/buttonProps.interface";
import React from "react";

const Button: React.FC<ButtonProps> = ({
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

export default Button;
