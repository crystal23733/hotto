import { conditional } from "@shared/pipes/condition";
import loginRequest from "../../api/auth/loginRequest";
import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import { useRouter } from "next/router";
import FetchApi from "client/src/api/lib/FetchApi";
import serverUrl from "client/src/module/serverUrl";
import checkAuthStatus from "client/src/api/auth/checkAuthStatus";
import { ERROR_UNKNOWN } from "client/src/constants/error/errorMessage";

const fetchApi = new FetchApi(serverUrl);

/**
 * 24.08.08
 * @returns {JSX.Element} - 로그인 컴포넌트의 함수 집합
 */
const LoginFormContainer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      const response = await loginRequest(email, password);

      // 로그인 요청의 응답이 에러를 포함하고 있는지 확인
      if (response.error) {
        setError(response.error);
      } else {
        const authResponse = await checkAuthStatus();
        if (authResponse.isAuthenticated) {
          router.reload();
        } else {
          setError("로그인 처리 중 문제가 발생했습니다.");
        }
      }
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
      setError(ERROR_UNKNOWN);
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
