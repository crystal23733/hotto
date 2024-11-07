import { useState } from "react";

/**
 * 결제 모달의 상태를 관리하는 커스텀 훅
 */
export default () => {
  const [isPayActive, setIsPayActive] = useState<boolean>(false);

  // 모달을 여는 함수
  const handleBuyModal = () => {
    setIsPayActive(true);
  };

  // 모달을 닫는 함수
  const closePayModal = () => {
    setIsPayActive(false);
  };

  return { isPayActive, handleBuyModal, closePayModal };
};
