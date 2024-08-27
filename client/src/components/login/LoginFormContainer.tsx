import { conditional } from "@shared/pipes/condition";
import loginRequest from "../../api/auth/loginRequest";
import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import { useRouter } from "next/router";
import { useAuth } from "client/src/context/AuthContext";
import FetchApi from "client/src/api/lib/FetchApi";
import serverUrl from "client/src/module/serverUrl";

const fetchApi = new FetchApi(serverUrl);

/**
 * 24.08.08
 * @returns {JSX.Element} - 로그인 컴포넌트의 함수 집합
 */
const LoginFormContainer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    return () => {
      fetchApi.abortRequest();
    };
  });

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
      setIsAuthenticated(true);
      await loginRequest(email, password);
      router.push("/");
      router.reload();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message || "로그인에 실패했습니다.");
      } else {
        setError("로그인에 실패했습니다.");
      }
      setIsAuthenticated(false);
    }
  };

  return (
    <LoginForm
      email={email}
      password={password}
      onEmailChange={handleEmailChange}
      onPasswordChange={handlePasswordChange}
      onSubmit={handleSubmit}
      error={error}
    />
  );
};

export default LoginFormContainer;
