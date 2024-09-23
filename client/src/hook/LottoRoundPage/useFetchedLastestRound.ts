import lastNumberApi from "client/src/api/content/lastNumberApi";
import { useEffect } from "react";
import useApiRequest from "../common/api/useApiRequest";

/**
 * 최신 로또 회차를 가져오는 커스텀 훅
 * @returns {{data: number, loading: boolean, error: Error | null}} 최신 회차 번호, 로딩 상태, 에러 상태
 */
export const useFetchLatestRound = () => {
  const { data, loading, error, setData, setLoading, setError } =
    useApiRequest();

  useEffect(() => {
    const fetchLatestRound = async () => {
      setLoading(true);
      try {
        const result = await lastNumberApi();
        setData(result);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to fetch latest round"),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLatestRound();
  }, [setData, setError, setLoading]);

  return { data, loading, error };
};
