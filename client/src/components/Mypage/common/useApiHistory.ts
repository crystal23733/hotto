import mypageHistoryRequest from "client/src/api/myPage/common/mypageHistoryRequest";
import useApiRequest from "client/src/hook/common/api/useApiRequest";
import { useEffect, useState } from "react";

// T는 최소한 createdAt을 포함해야 하므로 WithCreatedAt 인터페이스를 확장
interface WithCreatedAt {
  createdAt: string;
}

/**
 * 공통으로 데이터 내역을 가져오고 필터링하는 커스텀 훅
 * @param {string} endpoint - 데이터를 가져올 API 엔드포인트
 * @returns {object} 데이터 내역, 필터링 함수, 로딩 상태, 에러 정보
 */
export default <T extends WithCreatedAt>(endpoint: string) => {
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

  // 날짜 필터링하는 함수
  const filterByDate = () => {
    if (dateFilter && data) {
      return data.filter(
        (item) =>
          new Date(item.createdAt).toLocaleDateString() ===
          new Date(dateFilter).toLocaleDateString(),
      );
    }
    return data || [];
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return { data: filterByDate(), setDateFilter, loading, error };
};
