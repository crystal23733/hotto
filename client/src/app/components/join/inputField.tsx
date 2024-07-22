import React from 'react';

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  minLength?: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  status: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
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
      <div id={`${name}-box`} style={{ backgroundColor: status ? 'green' : 'red' }}></div>
    </div>
  );
};

export default InputField;