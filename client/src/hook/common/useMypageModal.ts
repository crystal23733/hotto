import { useCallback, useEffect, useState } from "react";
import useApiRequest from "./api/useApiRequest";
import passwordRequest from "client/src/api/auth/passwordRequest";
import IPasswordRequestResponse from "@shared/interface/verifyPassword.interface";

/**
 * 비밀번호 검증을 위한 훅
 * @returns {{ verifyPassword: Function, data: IPasswordRequestResponse | null, error: Error | null, loading: boolean }}
 */
export default () => {
  const [password, setPassword] = useState<string>("");
  const { data, error, loading, setData, setError, setLoading } =
    useApiRequest<IPasswordRequestResponse>();

  /**
   * 비밀번호 검증을 수행하는 함수
   * @param {string} password - 검증할 비밀번호
   */
  const verifyPassword = useCallback(async () => {
    setLoading(true);
    try {
      const result = await passwordRequest(password);
      if (result.success) {
        setData(result);
      } else {
        setError(new Error(result.message || "비밀번호 검증 실패"));
      }
    } catch (error) {
      setError(error instanceof Error ? error : new Error("서버 오류"));
    } finally {
      setLoading(false);
    }
  }, [password, setData, setError, setLoading]);

  return { password, setPassword, data, error, loading, verifyPassword };
};
