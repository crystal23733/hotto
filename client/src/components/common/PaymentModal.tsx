import React from "react";
import Modal from "./Modal";
import IModalProps from "@shared/interface/modal.interface";
import PaymentLabel from "./PaymentLabel";
import usePaymentModal from "client/src/hook/common/usePaymentModal";
import usePayOption from "client/src/hook/Modal/usePayOption";

const PaymentModal: React.FC<IModalProps> = ({ isActive, closeModal }) => {
  const { selectedOption, handleOptionChange } = usePayOption();
  const { data, error, loading, fetchPaymentData } =
    usePaymentModal(selectedOption);
  console.log(data);
  const handlePaymentBtn = () => {
    fetchPaymentData();
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
