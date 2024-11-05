import React from "react";
import HistoryListProps from "../interface/HistoryListProps";
import Loading from "../../common/Loading";

/**
 * 공통내역 리스트 컴포넌트
 * @param {HistoryListProps} props - 데이터, 로딩, 에러 정보
 * @returns {JSX.Element} 컴포넌트
 */
const HistoryList: React.FC<HistoryListProps> = ({ data, loading, error }) => {
  if (!data || data.length === 0) {
    return (
      <div className="empty-state history-error">
        <p className="help is-danger">결제 내역이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="history-list">
      {data.map((item) => (
        <div className="history-item" key={item.pay_order_id}>
          <p className="history-item-title">주문번호: {item.pay_order_id}</p>
          <p className="history-item-amount">상품 금액: {item.amount}</p>
          <p className="history-item-detail">결제 상태: {item.status}</p>
          <p className="history-item-detail">결제 방법: {item.pay}</p>
          <p className="history-item-date">결제일: {item.created_at}</p>
          {loading && <Loading />}
          {error && <p className="help is-danger">{error.message}</p>}
        </div>
      ))}
    </div>
  );
};

export default HistoryList;
