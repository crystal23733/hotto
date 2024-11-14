import React from "react";
import OneButtonModalCard from "./OneButtonModalCard";
import SessionExpiredModalProps from "./interface/SessionExpiredModalProps";

const SessionExpiredModal: React.FC<SessionExpiredModalProps> = ({
  isVisible,
  onConfirm,
}) => {
  if (!isVisible) return null;

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onConfirm}></div>
      <OneButtonModalCard
        title="세션 만료"
        content="세션이 만료되었습니다. 다시 로그인 해주세요."
        onClose={onConfirm}
      />
    </div>
  );
};

export default SessionExpiredModal;
