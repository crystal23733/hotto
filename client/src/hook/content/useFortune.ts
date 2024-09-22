import { useEffect, useState } from "react";
import useApiRequest from "../common/api/useApiRequest";
import fortuneRequest from "client/src/api/auth/fortuneRequest";

export default () => {
  const [contentText, setContentText] = useState<string>("");
  const { data, setData, loading, setLoading, error, setError } =
    useApiRequest();
  console.log(contentText);
  const fortuneSubmit = async () => {
    setLoading(true);
    try {
      const result = await fortuneRequest(contentText);
      console.log(result);
      setData(result);
    } catch (error) {
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
