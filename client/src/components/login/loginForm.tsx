import React from "react";

interface LoginFormProps {
  email: string;
  password: string;
  error: string | null;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

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
        <div>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={onEmailChange}
            placeholder="이메일"
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={onPasswordChange}
            placeholder="비밀번호"
            minLength={5}
          />
        </div>
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
