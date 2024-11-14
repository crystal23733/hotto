import React from "react";
import ButtonProps from "./interface/buttonProps";

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
