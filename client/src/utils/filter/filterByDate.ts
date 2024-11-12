import { IHistoryItem } from "client/src/components/Mypage/interface/IHistoryItem";

/**
 * 날짜에 따른 필터링 함수
 * @param {IHistoryItem[]} data - 필터링 할 배열
 * @param {string} dateFilter - 필터링에 사용할 날짜 배열
 * @returns {IHistoryItem[]} - 필터링 된 날짜 배열
 */
export default (data: IHistoryItem[], dateFilter: string): IHistoryItem[] => {
  if (!dateFilter) return data;

  return data.filter((item) => {
    return item.created_at_date === dateFilter; // 단순 문자열 비교
  });
};
