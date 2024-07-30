// todo 추후 박스 컴포넌트 따로 나눌 필요가 있음
import React from "react";
import IInputFieldProps from "./interface/IInputFieldProps";

const InputField: React.FC<IInputFieldProps> = ({
  label,
  type,
  name,
  placeholder,
  minLength,
  value,
  onChange,
  status,
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        required
        name={name}
        placeholder={placeholder}
        minLength={minLength}
        value={value}
        onChange={onChange}
      />
      <div
        id={`${name}-box`}
        style={{ backgroundColor: status ? "green" : "red" }}
      ></div>
    </div>
  );
};

export default InputField;
