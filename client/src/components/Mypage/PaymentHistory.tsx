import React from "react";
import HistoryFilter from "./common/HistoryFilter";
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
    </div>
  );
};

export default PaymentHistory;
