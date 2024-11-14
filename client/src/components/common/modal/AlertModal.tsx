import AlertModalProps from "client/src/pipes/interface/common/modal/alertModalProps.interface";
import React from "react";
import AlertModalCard from "./AlertModalCard";

const AlertModal: React.FC<AlertModalProps> = ({
  isVisible,
  title,
  content,
  onClose,
  onDoNotShowAgain,
}) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className={`modal ${isVisible ? "is-active" : ""}`} id="alert-modal">
      <div className="modal-background" onClick={onClose}></div>
      <AlertModalCard
        title={title}
        content={content}
        onClose={onClose}
        onDoNotShowAgain={onDoNotShowAgain}
      />
    </div>
  );
};

export default AlertModal;
