import { useEffect, useState } from "react";
import useApiRequest from "../common/api/useApiRequest";
import fortuneRequest from "client/src/api/auth/fortuneRequest";
import FortuneResponse from "@shared/interface/fortune.interface";

export default () => {
  const [contentText, setContentText] = useState<string>("");
  const { data, setData, loading, setLoading, error, setError } =
    useApiRequest();
  console.log(contentText);
  const fortuneSubmit = async (): Promise<FortuneResponse | null> => {
    setLoading(true);
    try {
      const result = await fortuneRequest(contentText);
      console.log(result);
      setData(result);
      return result as FortuneResponse;
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("에러가 발생하였습니다."),
      );
      return null;
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
