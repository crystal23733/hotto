import { conditional } from "@shared/pipes/condition";
import loginRequest from "../../api/login/loginRequest";
import React, { useState } from "react";
import LoginForm from "./loginForm";

const LoginFormContainer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!conditional.emailCon(email)) {
      setError("유효하지 않은 양식의 이메일입니다!");
      return;
    }
    if (!conditional.passwordLength(password)) {
      setError("유효하지 않은 양식의 비밀번호 입니다!");
      return;
    }

    try {
      const result = await loginRequest(email, password);
      console.log(result);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message || "로그인에 실패했습니다.");
      } else {
        setError("로그인에 실패했습니다.");
      }
    }
  };

  return (
    <LoginForm
      email={email}
      password={password}
      onEmailChange={handleEmailChange}
      onPasswordChange={handlePasswordChange}
      onSubmit={handleSubmit}
      error={null}
    />
  );
};

export default LoginFormContainer;
