import { useEffect, useState } from "react";
import useApiRequest from "../common/api/useApiRequest";
import fortuneRequest from "client/src/api/auth/fortuneRequest";

export default () => {
  const [contentText, setContentText] = useState<string>("");
  const { data, setData, loading, setLoading, error, setError } =
    useApiRequest();
  console.log(contentText);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fortuneRequest(contentText);
        setData(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return {
    data,
    setData,
    loading,
    setLoading,
    error,
    setError,
    contentText,
    setContentText,
  };
};
