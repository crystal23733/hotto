import React from "react";
import Modal from "./Modal";
import IModalProps from "@shared/interface/modal.interface";
import PaymentLabel from "./PaymentLabel";
import useLottoOptions from "client/src/hook/pick/useLottoOptions";
import usePaymentModal from "client/src/hook/common/usePaymentModal";

const PaymentModal: React.FC<IModalProps> = ({ isActive, closeModal }) => {
  const { selectedOption, handleOptionChange } = useLottoOptions();
  const { data, error, loading } = usePaymentModal(selectedOption);
  console.log(data);
  const handlePaymentBtn = () => {};
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
