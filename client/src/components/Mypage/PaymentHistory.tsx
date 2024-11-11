import React from "react";
import HistoryFilter from "./common/HistoryFilter";
import HistoryList from "./common/HistoryList";
import useApiHistory from "../../hook/Mypage/useApiHistory";

/**
 * 결제 내역 컴포넌트
 */
const PaymentHistory: React.FC = () => {
  const paymentHistoryUrl = process.env
    .NEXT_PUBLIC_PAY_PAYMENT_HISTORY_ENDPOINT as string;
  const { data, setDateFilter, loading, error } =
    useApiHistory(paymentHistoryUrl);

  return (
    <div>
      <HistoryFilter setDateFilter={setDateFilter} />
      <HistoryList data={data} loading={loading} error={error} type="payment" />
    </div>
  );
};

export default PaymentHistory;
