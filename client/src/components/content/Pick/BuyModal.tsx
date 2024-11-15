import React from "react";
import { UNIQUE_PRICE } from "client/src/constants/payment";
import { v4 as uuidv4 } from "uuid";
import BuyModalProps from "client/src/pipes/interface/pick/buyModalProps";
import useGeneratePaidNumbers from "client/src/hook/pick/useGeneratePaidNumbers";
import Modal from "../../common/modal/Modal";

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
const BuyModal: React.FC<BuyModalProps> = ({
  isActive,
  closeModal,
  generatePaidNumbers,
}) => {
  const { loading, error } = useGeneratePaidNumbers();

  /**
   * 모달에서 "확인" 버튼을 눌렀을 때 실행되는 함수
   */
  const handleConfirm = async () => {
    const buyRequestBody = {
      pay_order_id: uuidv4(),
      amount: UNIQUE_PRICE,
    };

    await generatePaidNumbers(buyRequestBody);
    closeModal();
  };

  return (
    <>
      <Modal
        isActive={isActive}
        closeModal={closeModal}
        title="유니크 번호 생성"
        onConfirm={handleConfirm}
        loadingStatus={loading}
      >
        <p>500원입니다. 구매하시겠습니까?</p>
        {error && <p className="help is-danger">{error.message}</p>}
      </Modal>
    </>
  );
};

export default BuyModal;
