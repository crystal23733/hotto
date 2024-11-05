import React from "react";
import HistoryFilterProps from "../interface/HistoryFilterProps";

/**
 * 날짜별로 내역을 필터링하는 컴포넌트
 * @param {HistoryFilterProps} props - 날짜 필터링하는 함수
 * @returns {JSX.Element}
 */
const HistoryFilter: React.FC<HistoryFilterProps> = ({ setDateFilter }) => {
  return (
    <div>
      <label>날짜 선택: </label>
      <input
        placeholder="날짜"
        type="date"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setDateFilter(e.target.value)
        }
      />
    </div>
  );
};

export default HistoryFilter;
