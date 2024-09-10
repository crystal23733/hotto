import React from "react";
import Modal from "../common/Modal";
import IModalProps from "@shared/interface/modal.interface";

const MypageFormModal: React.FC<IModalProps> = ({isActive, closeModal}) => {

  return (
    <Modal
      isActive={isActive}
      closeModal={closeModal}
      title="비밀번호 변경"
    >
      <input placeholder="기존 비밀번호" />
    </Modal>
  );
};

export default MypageFormModal;
