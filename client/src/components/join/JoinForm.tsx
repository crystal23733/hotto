import React from "react";
import FormInput from "../FormInput";

interface JoinFormProps {
  formData: {
    name: string;
    email: string;
    password: string;
    checkPassword: string;
    phone: string;
  };
  errors: string[];
  status: boolean[];
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const JoinForm: React.FC<JoinFormProps> = ({
  formData,
  errors,
  status,
  onInputChange,
  onSubmit,
}) => {
  return (
    <form id="join-form" onSubmit={onSubmit}>
      <FormInput
        label="이름"
        type="text"
        id="name"
        placeholder="이름"
        minLength={2}
        value={formData.name}
        onChange={onInputChange}
        status={status[0]}
      />
      <FormInput
        label="이메일"
        type="email"
        id="email"
        placeholder="이메일"
        value={formData.email}
        onChange={onInputChange}
        status={status[1]}
      />
      <FormInput
        label="비밀번호"
        type="password"
        id="password"
        placeholder="비밀번호"
        minLength={5}
        value={formData.password}
        onChange={onInputChange}
        status={status[2]}
      />
      <FormInput
        label="비밀번호 확인"
        type="password"
        id="checkPassword"
        placeholder="비밀번호 확인"
        minLength={5}
        value={formData.checkPassword}
        onChange={onInputChange}
        status={status[3]}
      />
      <FormInput
        label="전화번호"
        type="text"
        id="phone"
        placeholder="전화번호"
        value={formData.phone}
        onChange={onInputChange}
        status={status[4]}
      />
      <input type="submit" value="회원가입" />
      {errors.length > 0 && (
        <div>
          {errors.map((error, index) => (
            <p key={index} style={{ color: "red" }}>
              {error}
            </p>
          ))}
        </div>
      )}
    </form>
  );
};

export default JoinForm;
