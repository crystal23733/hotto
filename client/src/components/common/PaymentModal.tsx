import React from "react";
import Modal from "./Modal";
import IModalProps from "@shared/interface/modal.interface";
import PaymentLabel from "./PaymentLabel";
import usePaymentModal from "client/src/hook/common/usePaymentModal";
import usePayOption from "client/src/hook/Modal/usePayOption";
import usePaymentSecurity from "../../hook/payment/usePaymentSecurity";

/**
 * 결제 요청 창을 생성하는 모달창
 * @param {boolean} isActive - 활성 상태
 * @param {boolean} closeModal - 창 닫기
 * @returns {JSX.Element} - 모달 컴포넌트
 */
const PaymentModal: React.FC<IModalProps> = ({ isActive, closeModal }) => {
  const { selectedOption, handleOptionChange } = usePayOption();
  const { loading, fetchPaymentData } = usePaymentModal(selectedOption);
  const { initializePayment, cleanupPayment } = usePaymentSecurity();

  const handlePaymentBtn = () => {
    try {
      // 결제 시작 시 쿠키 설정
      initializePayment();
      fetchPaymentData();
    } catch (error) {
      // 에러 발생 시 쿠키 삭제
      cleanupPayment();
    }
  };
  return (
    <Modal
      isActive={isActive}
      closeModal={closeModal}
      title="충전하기"
      onConfirm={handlePaymentBtn}
      loadingStatus={loading}
    >
      <PaymentLabel
        selectedOption={selectedOption}
        onChange={handleOptionChange}
      />
    </Modal>
  );
};

export default PaymentModal;
