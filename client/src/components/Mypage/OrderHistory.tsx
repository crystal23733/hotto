import React from "react";
import HistoryFilter from "./common/HistoryFilter";
import HistoryList from "./common/HistoryList";
import useApiHistory from "../../hook/Mypage/useApiHistory";

/**
 * 주문 내역 컴포넌트
 */
const OrderHistory: React.FC = () => {
  const orderHistoryUrl = process.env
    .NEXT_PUBLIC_PAY_ORDER_HISTORY_ENDPOINT as string;
  const { data, setDateFilter, loading, error } =
    useApiHistory(orderHistoryUrl);

  return (
    <div>
      <HistoryFilter setDateFilter={setDateFilter} />
      <HistoryList data={data} loading={loading} error={error} type="order" />
    </div>
  );
};

export default OrderHistory;
