import React from "react";
import HistoryListProps from "../interface/HistoryListProps";

/**
 * 공통내역 리스트 컴포넌트
 * @param {HistoryListProps} props - 데이터, 로딩, 에러 정보
 * @returns {JSX.Element} 컴포넌트
 */
const HistoryList: React.FC<HistoryListProps> = ({ data, loading, error }) => {
  return (
    <div className="hitory-list">
      {data.map((item) => (
        <div className="history-item" key={item.orderID}>
          <p>주문번호: {item.orderID}</p>
          <p>상품 금액: {item.amount}</p>
          <p>결제 상태: {item.status}</p>
          <p>결제일: {item.createAt}</p>
        </div>
      ))}
    </div>
  );
};

export default HistoryList;
