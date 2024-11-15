import React from "react";
import IModalProps from "@shared/interface/modal.interface";
import useChangePassword from "client/src/hook/Mypage/useChangePassword";
import Modal from "../common/modal/Modal";
import useShakeAnimation from "client/src/hook/Mypage/useShakeAnimation";
import useValidation from "client/src/hook/Mypage/useValidation";
import getInputClass from "client/src/utils/filter/getInputClass";

const ChangePasswordModal: React.FC<IModalProps> = ({
  isActive,
  closeModal,
}) => {
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
    validationError,
    setValidationError,
  } = useChangePassword();

  const { shake, triggerShake } = useShakeAnimation();
  const validations = useValidation(changePassword, changePasswordConfirm);

  const handleChangePassword = async () => {
    if (!oldPassword) {
      triggerShake("oldPassword");
      setValidationError("기존 비밀번호를 입력해주세요.");
      return;
    }

    if (!validations.lengthValid) {
      triggerShake("newPassword");
      setValidationError(
        "새 비밀번호는 8자 이상, 대소문자, 숫자, 특수문자를 포함해야 합니다.",
      );
      return;
    }

    if (!validations.matchValid) {
      triggerShake("confirmPassword");
      setValidationError("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    const success = await verifyPassword();
    if (success) {
      closeModal();
      setValidationError(null); // 검증 오류 메시지 초기화
      setError(null); // 서버 에러 메시지 초기화
    }
  };

  return (
    <Modal
      isActive={isActive}
      closeModal={closeModal}
      title="비밀번호 변경"
      onConfirm={handleChangePassword}
      loadingStatus={loading}
    >
      <div className="field">
        <label className="label">기존 비밀번호</label>
        <div className="control has-icons-left has-icons-right">
          <input
            type="password"
            className={`input ${shake.oldPassword ? "shake" : ""}`}
            placeholder="기존 비밀번호를 입력해주세요"
            value={oldPassword}
            onChange={(event) => setOldPassword(event.target.value)}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-lock"></i>
          </span>
        </div>
        {validationError && shake.oldPassword && (
          <p className="help is-danger">{validationError}</p>
        )}
      </div>

      <div className="field">
        <label className="label">새 비밀번호</label>
        <div className="control has-icons-left has-icons-right">
          <input
            type="password"
            className={`${getInputClass("new", validations.lengthValid, validations.matchValid, changePassword, changePasswordConfirm)} ${shake.newPassword ? "shake" : ""}`}
            placeholder="새로운 비밀번호를 입력해주세요"
            value={changePassword}
            onChange={(event) => setChangePassword(event.target.value)}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-key"></i>
          </span>
        </div>
        {validationError && shake.newPassword && (
          <p className="help is-danger">{validationError}</p>
        )}
      </div>

      <div className="field">
        <label className="label">새 비밀번호 확인</label>
        <div className="control has-icons-left has-icons-right">
          <input
            type="password"
            className={`${getInputClass("confirm", validations.lengthValid, validations.matchValid, changePassword, changePasswordConfirm)} ${shake.confirmPassword ? "shake" : ""}`}
            placeholder="새로운 비밀번호를 다시 입력해주세요"
            value={changePasswordConfirm}
            onChange={(event) => setChangePasswordConfirm(event.target.value)}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-key"></i>
          </span>
        </div>
        {validationError && shake.confirmPassword && (
          <p className="help is-danger">{validationError}</p>
        )}
      </div>

      {error && (
        <div className="notification is-danger is-light">
          <p
            className="delete"
            onClick={() => {
              setValidationError(null);
              setError(null);
            }}
          ></p>
          {error.message}
        </div>
      )}
    </Modal>
  );
};

export default ChangePasswordModal;
