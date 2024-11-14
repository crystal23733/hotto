import React from "react";
import IModalProps from "@shared/interface/modal.interface";
import useChangePassword from "client/src/hook/Mypage/useChangePassword";
import Modal from "../common/modal/Modal";
import SessionExpiredModal from "../common/modal/SessionExpiredModal";

const MypageFormModal: React.FC<IModalProps> = ({ isActive, closeModal }) => {
  const {
    oldPassword,
    setOldPassword,
    changePassword,
    setChangePassword,
    changePasswordConfirm,
    setChangePasswordConfirm,
    verifyPassword,
    loading,
    error,
    setError,
    isSessionExpired,
    setIsSessionExpired,
  } = useChangePassword();

  const handleChangePasswordBtn = async () => {
    const success = await verifyPassword();
    if (success) {
      closeModal();
      setError(null);
    }
  };

  const handleSessionExpiredConfirm = () => {
    setIsSessionExpired(false);
    window.location.reload(); // 확인 버튼을 누르면 페이지 새로고침
  };

  return (
    <>
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
        {error && <p className="help is-danger">{error.message}</p>}
      </Modal>
      <SessionExpiredModal
        isVisible={isSessionExpired}
        onConfirm={handleSessionExpiredConfirm}
      />
    </>
  );
};

export default MypageFormModal;
