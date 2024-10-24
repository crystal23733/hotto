import React from "react";
import PaymentFilter from "./PaymentFilter";

const PaymentHistory: React.FC = () => {
  return (
    <div>
      <h2 className="title is-4">결제 내역</h2>
      <PaymentFilter />
    </div>
  );
};

export default PaymentHistory;
