import mypageHistoryRequest from "client/src/api/myPage/common/mypageHistoryRequest";
import useApiRequest from "client/src/hook/common/api/useApiRequest";
import filterByDate from "../../utils/filter/filterByDate";
import { useEffect, useState } from "react";
import IPaymentHistory from "client/src/components/Mypage/interface/IPaymentHistory";
import IOrderHistory from "client/src/components/Mypage/interface/IOrderHistory";

/**
 * 공통으로 데이터 내역을 가져오고 필터링하는 커스텀 훅
 * @param {string} endpoint - 데이터를 가져올 API 엔드포인트
 * @returns {object} 데이터 내역, 필터링 함수, 로딩 상태, 에러 정보
 */
export default <T extends IPaymentHistory | IOrderHistory>(
  endpoint: string,
) => {
  const { data, loading, error, setData, setLoading, setError } =
    useApiRequest<T[]>();
  const [dateFilter, setDateFilter] = useState<string>("");

  // 데이터 가져오는 함수
  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await mypageHistoryRequest<T[]>(endpoint);
      // 정렬 함수
      const sortedData = response.sort((a, b) => {
        const parseDateString = (dateString: string) => {
          // 날짜 문자열을 '년', '월', '일'로 나누기
          const [yearPart, monthPart, dayPart] = dateString.split(" ");

          // 년도, 월, 일을 숫자로 파싱
          const year = parseInt(yearPart.replace("년", ""), 10);
          const month = parseInt(monthPart.replace("월", ""), 10) - 1; // 월은 0부터 시작하므로 1을 빼줌
          const day = parseInt(dayPart.replace("일", ""), 10);

          // 시간 부분 분리 및 파싱
          const timePart = dateString.split(" ")[3] || "00:00";
          const [hour, minute] = timePart.split(":").map(Number);

          // Date 객체 생성
          return new Date(year, month, day, hour, minute);
        };

        // 문자열을 Date 객체로 변환
        const dateA = parseDateString(a.created_at);
        const dateB = parseDateString(b.created_at);

        // 내림차순 정렬
        return dateB.getTime() - dateA.getTime();
      });

      console.log(sortedData);
      // 응답이 빈 배열인 경우 에러로 처리
      if (!response || response.length === 0) {
        throw new Error("결제 내역이 없습니다.");
      }
      setData(response);
    } catch (err) {
      setError(err as Error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [dateFilter]);

  // 필터링된 데이터를 반환
  const filteredData = filterByDate(data || [], dateFilter);

  return { data: filteredData, setDateFilter, loading, error };
};
