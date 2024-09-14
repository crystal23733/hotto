import { useCallback, useState } from "react";
import useApiRequest from "./api/useApiRequest";
import passwordRequest from "client/src/api/auth/passwordRequest";
import IPasswordRequestResponse from "@shared/interface/verifyPassword.interface";
import { useRouter } from "next/router";

/**
 * 비밀번호 검증을 위한 훅
 * @returns {{
 *  password: string,
 *  setPassword: Function,
 *  data: IPasswordRequestResponse | null,
 *  error: Error | null,
 *  loading: boolean,
 *  verifyPasswordAndNavigate: Function
 * }}
 */
export default () => {
  const [password, setPassword] = useState<string>("");
  const { data, error, loading, setData, setError, setLoading } =
    useApiRequest<IPasswordRequestResponse>();
  const router = useRouter();

  /**
   * 비밀번호 검증을 수행하고, 성공 시 마이페이지로 이동하는 함수
   */
  const verifyPasswordAndNavigate = useCallback(async () => {
    setLoading(true);
    try {
      const result = await passwordRequest(password);
      if (result.success) {
        setData(result);
        setPassword(""); // 비밀번호 상태 초기화
        router.push("/Mypage"); // 검증 성공 시 마이페이지로 이동
        return true;
      } else {
        setError(new Error(result.message || "비밀번호 검증 실패"));
        return false;
      }
    } catch (error) {
      setError(error instanceof Error ? error : new Error("서버 오류"));
      return false;
    } finally {
      setLoading(false);
    }
  }, [password, setData, setError, setLoading, router]);

  return {
    password,
    setPassword,
    data,
    error,
    setError,
    loading,
    verifyPasswordAndNavigate,
  };
};
