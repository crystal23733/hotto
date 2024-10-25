import mypageHistoryRequest from "client/src/api/myPage/common/mypageHistoryRequest";
import useApiRequest from "client/src/hook/common/api/useApiRequest";
import IHistoryItem from "../../components/Mypage/interface/IHistoryItem";
import { useEffect, useState } from "react";

/**
 * 공통으로 데이터 내역을 가져오고 필터링하는 커스텀 훅
 * @param {string} endpoint - 데이터를 가져올 API 엔드포인트
 * @returns {object} 데이터 내역, 필터링 함수, 로딩 상태, 에러 정보
 */
export default <T>(endpoint: string) => {
  const { data, loading, error, setData, setLoading, setError } =
    useApiRequest<T[]>();
  const [dateFilter, setDateFilter] = useState<string>("");

  // 데이터 가져오는 함수
  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await mypageHistoryRequest<T[]>(endpoint);
      setData(response);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return { data: filterByDate(), setDateFilter, loading, error };
};
