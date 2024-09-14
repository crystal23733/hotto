import useMypageModal from "client/src/hook/common/useMypageModal";
import React from "react";
import Modal from "./Modal";
import IModalProps from "@shared/interface/modal.interface";

/**
 * 마이페이지 입장 모달
 *
 * 사용자가 마이페이지로 진입하기 전에 비밀번호를 확인하는 모달입니다.
 * 비밀번호를 입력하고 "마이페이지" 버튼을 클릭하면 비밀번호 검증 후 마이페이지로 이동합니다.
 *
 * @component
 *
 * @param {Object} props - 컴포넌트에 전달되는 props
 * @param {boolean} props.isActive - 모달의 활성화 상태를 나타냅니다. true면 모달이 활성화됩니다.
 * @param {function} props.closeModal - 모달을 닫는 함수입니다.
 *
 * @returns {React.FC} 마이페이지 입장 모달
 */
const MypageModal: React.FC<IModalProps> = ({ isActive, closeModal }) => {
  const {
    password,
    setPassword,
    error,
    setError,
    loading,
    verifyPasswordAndNavigate,
  } = useMypageModal();

  /**
   * 비밀번호 검증 및 페이지 이동을 처리하고, 성공 시 모달을 닫습니다.
   */
  const handleMypageBtn = async () => {
    const success = await verifyPasswordAndNavigate();
    if (success) {
      closeModal(); // 성공 시 모달 닫기
      setError(null);
    }
  };

  return (
    <Modal
      isActive={isActive}
      closeModal={closeModal}
      title="비밀번호 확인"
      onConfirm={handleMypageBtn}
      loadingStatus={loading}
    >
      <input
        type="password"
        placeholder="비밀번호를 입력해주세요."
        className="input is-primary"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      {error && <p className="help is-danger">{error.message}</p>}
    </Modal>
  );
};

export default MypageModal;
