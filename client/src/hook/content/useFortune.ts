import { useState } from "react";
import useApiRequest from "../common/api/useApiRequest";
import fortuneRequest from "client/src/api/auth/fortuneRequest";
import {
  FortuneResponse,
  ErrorResponse,
} from "@shared/interface/fortune.interface";

/**
 * 운세 기능을 위한 커스텀 훅
 *
 * @returns {object} 운세 관련 상태 및 함수를 포함하는 객체
 * @date 2024.09.23
 */
export default () => {
  const [contentText, setContentText] = useState<string>("");
  const { data, setData, loading, setLoading, error, setError } =
    useApiRequest();

  /**
   * 운세 요청을 수행하는 함수
   *
   * @returns {Promise<FortuneResponse | null>} 운세 API 응답 또는 null
   */
  const fortuneSubmit = async (): Promise<FortuneResponse | ErrorResponse> => {
    setLoading(true);
    try {
      const result = await fortuneRequest(contentText);
      setData(result);
      return result as FortuneResponse;
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("에러가 발생하였습니다."),
      );
      return error as ErrorResponse;
    } finally {
      setLoading(false);
    }
  };
  return {
    data,
    setData,
    loading,
    setLoading,
    error,
    setError,
    contentText,
    setContentText,
    fortuneSubmit,
  };
};
