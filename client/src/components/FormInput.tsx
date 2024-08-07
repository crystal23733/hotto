import React from "react";

interface FormInputProps {
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
  minLength?: number; // optional prop for password input
  required?: boolean; // optional prop for required field
  status?: boolean; // optional prop for status indication
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  type,
  value,
  onChange,
  placeholder,
  label,
  minLength,
  required = true,
  status,
}) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        minLength={minLength}
        required={required}
        name={id}
      />
      {status !== undefined && (
        <div
          id={`${id}-box`}
          style={{ backgroundColor: status ? "green" : "red" }}
        ></div>
      )}
    </div>
  );
};

export default FormInput;
