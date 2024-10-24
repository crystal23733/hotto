import React, { useState } from "react";

interface PaymentFilterProps {
  onFilter: (startDate: string, endDate: string) => void;
}

/**
 * 결제 내역 필터링 컴포넌트
 * 시작 날짜와 종료 날짜를 입력받아 필터링 요청을 전달한다.
 */
const PaymentFilter: React.FC = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div className="field has-addons">
      <div className="control">
        <input
          type="date"
          className="input"
          placeholder="시작 날짜"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="control">
        <input
          type="date"
          className="input"
          placeholder="종료 날짜"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div className="control">
        <button className="button is-primary">검색</button>
      </div>
    </div>
  );
};

export default PaymentFilter;
