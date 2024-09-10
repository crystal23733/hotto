import React from "react";
import Modal from "../common/Modal";
import IModalProps from "@shared/interface/modal.interface";

const MypageFormModal: React.FC<IModalProps> = ({ isActive, closeModal }) => {
  return (
    <Modal isActive={isActive} closeModal={closeModal} title="비밀번호 변경">
      <input type="password" className="input" placeholder="기존 비밀번호" />
      <input type="password" className="input" placeholder="변경할 비밀번호" />
      <input
        type="password"
        className="input"
        placeholder="변경할 비밀번호 확인"
      />
    </Modal>
  );
};

export default MypageFormModal;
