import { useState } from "react";

export default () => {
  const [isPayActive, setIsPayActive] = useState<boolean>(false); // * 모달창의 상태를 관리

  const handlePaymentModal = () => {
    setIsPayActive(true);
  };

  const closePayModal = () => {
    setIsPayActive(false);
  };

  return { isPayActive, handlePaymentModal, closePayModal };
};
