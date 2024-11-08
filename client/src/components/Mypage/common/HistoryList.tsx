import React, { useEffect, useRef, useState } from "react";
import HistoryListProps from "../interface/HistoryListProps";
import Loading from "../../common/Loading";

/**
 * 공통내역 리스트 컴포넌트
 * @param {HistoryListProps} props - 데이터, 로딩, 에러 정보
 * @returns {JSX.Element} 컴포넌트
 */
const HistoryList: React.FC<
  HistoryListProps & { type: "payment" | "order" }
> = ({ data, loading, error, type }) => {
  const [visibleItems, setVisibleItems] = useState(5);
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 모든 데이터를 이미 보여주고 있다면 observer를 설정하지 않음
    if (data && visibleItems >= data.length) {
      if (observer.current) observer.current.disconnect();
      return;
    }

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && data) {
          setVisibleItems((prev) => Math.min(prev + 5, data.length));
        }
      },
      {
        root: null,
        rootMargin: "20px",
        threshold: 0.1,
      },
    );

    if (loadMoreRef.current) {
      observer.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [visibleItems, data, loading]); // 의존성 배열에 visibleItems, data, loading 추가

  if (!data || data.length === 0) {
    return (
      <div className="empty-state history-error">
        <p className="help is-danger">결제 내역이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="history-list">
      {data.slice(0, visibleItems).map((item) => (
        <div className="history-item" key={item.pay_order_id}>
          <p className="history-item-title">주문번호: {item.pay_order_id}</p>
          <p className="history-item-amount">상품 금액: {item.amount}</p>
          <p className="history-item-detail">결제 상태: {item.status}</p>
          {type === "payment" && (
            <p className="history-item-detail">결제 방법: {item.pay}</p>
          )}
          <p className="history-item-date">결제일: {item.created_at}</p>
        </div>
      ))}
      {loading && <Loading />}
      {error && <p className="help is-danger">{error.message}</p>}
      {visibleItems < data.length && (
        <div ref={loadMoreRef} style={{ height: "20px" }} />
      )}
    </div>
  );
};

export default HistoryList;
