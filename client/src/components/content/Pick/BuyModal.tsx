import IModalProps from "@shared/interface/modal.interface";
import React, { useState } from "react";
import Modal from "../../common/Modal";
import useBuyNumber from "client/src/hook/pick/useBuyNumber";
import useGenerateNumbers from "client/src/hook/pick/useGenerateNumbers";
import { UNIQUE_PRICE } from "client/src/constants/payment";
import { v4 as uuidv4 } from "uuid";

/**
 * 유료 번호 생성 시 결제를 진행하는 모달 컴포넌트
 *
 * @component
 *
 * @param {Object} props - 컴포넌트에 전달되는 props
 * @param {boolean} props.isActive - 모달의 활성화 상태를 나타냅니다. true면 모달이 활성화됩니다.
 * @param {function} props.closeModal - 모달을 닫는 함수입니다.
 *
 * @returns {React.FC} 유료 번호 생성 모달
 */
const BuyModal: React.FC<IModalProps> = ({ isActive, closeModal }) => {
  const { processBuy, loading: buyLoading } = useBuyNumber();
  const { generateNumbers, loading: generateLoading } = useGenerateNumbers();
  const [error, setError] = useState<string | null>(null);

  /**
   * 모달에서 "확인" 버튼을 눌렀을 때 실행되는 함수
   */
  const handleConfirm = async () => {
    const buyRequestBody = {
      amount: UNIQUE_PRICE, // 결제 금액 상수 사용
      date: new Date().toISOString(), // 결제 일자 (ISO 형식)
      paymentId: uuidv4(), // UUID로 고유 결제 번호 생성
    };

    const isBuySuccessful = await processBuy(buyRequestBody);

    if (isBuySuccessful) {
      await generateNumbers(
        process.env.NEXT_PUBLIC_API_UNIQUE_ENDPOINT as string,
      );
    } else {
      setError("결제에 실패했습니다. 다시 시도해주세요.");
    }
    closeModal();
  };

  return (
    <Modal
      isActive={isActive}
      closeModal={closeModal}
      title="유니크 번호 생성"
      onConfirm={handleConfirm}
      loadingStatus={buyLoading || generateLoading}
    >
      <p>구매하시겠습니까?</p>
      {error && <p className="help is-danger">{error}</p>}
    </Modal>
  );
};

export default BuyModal;
