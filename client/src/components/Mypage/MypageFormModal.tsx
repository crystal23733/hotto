import React from "react";
import Modal from "../common/Modal";
import IModalProps from "@shared/interface/modal.interface";
import useChangePassword from "client/src/hook/Mypage/useChangePassword";

const MypageFormModal: React.FC<IModalProps> = ({ isActive, closeModal }) => {
  const {
    oldPassword,
    setOldPassword,
    changePassword,
    setChangePassword,
    changePasswordConfirm,
    setChangePasswordConfirm,
    data,
    verifyPassword,
    loading,
  } = useChangePassword();
  console.log(oldPassword);
  console.log("data:", data);
  const handleChangePasswordBtn = async () => {
    const success = await verifyPassword();
  };
  return (
    <Modal
      isActive={isActive}
      closeModal={closeModal}
      title="비밀번호 변경"
      onConfirm={handleChangePasswordBtn}
      loadingStatus={loading}
    >
      <input
        type="password"
        className="input"
        placeholder="기존 비밀번호"
        value={oldPassword}
        onChange={(event) => setOldPassword(event.target.value)}
      />
      <input
        type="password"
        className="input"
        placeholder="변경할 비밀번호"
        value={changePassword}
        onChange={(event) => setChangePassword(event.target.value)}
      />
      <input
        type="password"
        className="input"
        placeholder="변경할 비밀번호 확인"
        onChange={(event) => setChangePasswordConfirm(event.target.value)}
        value={changePasswordConfirm}
      />
    </Modal>
  );
};

export default MypageFormModal;
