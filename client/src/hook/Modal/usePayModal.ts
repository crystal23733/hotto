import { useState } from "react";
import usePaymentSecurity from "../payment/usePaymentSecurity";

export default () => {
  const [isPayActive, setIsPayActive] = useState<boolean>(false); // * 모달창의 상태를 관리
  const { cleanupPayment } = usePaymentSecurity();

  const handlePaymentModal = () => {
    setIsPayActive(true);
  };

  const closePayModal = () => {
    setIsPayActive(false);
    cleanupPayment();
  };

  return { isPayActive, handlePaymentModal, closePayModal };
};
