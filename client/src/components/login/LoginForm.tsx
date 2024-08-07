import React from "react";
import FormInput from "../FormInput";

/**
 * 24.08.08
 * @interface LoginFormProps
 * @property {email} - 이메일
 * @property {password} - 비밀번호
 * @property {error} - 에러 내용
 * @property {(e) => void} onEmailChange - input의 이메일 값을 바꿔주는 함수
 * @property {(e) => void} onPasswordChange - input의 비밀번호 값을 바꿔주는 함수
 * @property {(e) => void} onSubmit - 입력시 이벤트 실행시켜주는 함수
 */
interface LoginFormProps {
  email: string;
  password: string;
  error: string | null;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

/**
 * 24.08.08
 * @returns {JSX.Element} - 로그인 컴포넌트
 */
const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  error,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}) => {
  return (
    <div>
      <form onSubmit={onSubmit} id="login-form">
        <FormInput
          id="email"
          type="email"
          value={email}
          onChange={onEmailChange}
          placeholder="이메일"
          label="이메일"
        />
        <FormInput
          id="password"
          type="password"
          value={password}
          onChange={onPasswordChange}
          placeholder="비밀번호"
          label="비밀번호"
          minLength={5}
        />
        {error && (
          <div style={{ color: "red" }} className="error-message">
            {error}
          </div>
        )}
        <input type="submit" value="로그인" />
      </form>
    </div>
  );
};

export default LoginForm;
