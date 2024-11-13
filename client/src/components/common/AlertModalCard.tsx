import AlertModalCardProps from "client/src/pipes/interface/common/alertModalCardProps.interface";
import React from "react";
import Text from "./atoms/text/Text";
import AlertButton from "./atoms/button/Modal/AlertButton";

const AlertModalCard: React.FC<AlertModalCardProps> = ({
  title,
  content,
  onClose,
  onDoNotShowAgain,
}) => {
  return (
    <div className="modal-card">
      <header className="modal-card-head">
        <Text content={title} size="large" />
        <button
          className="delete"
          aria-label="close"
          onClick={onClose}
        ></button>
      </header>
      <section className="modal-card-body">
        <Text content={content} />
      </section>
      <footer className="modal-card-foot">
        <AlertButton label="닫기" onClick={onClose} type="secondary" />
        {onDoNotShowAgain && (
          <AlertButton
            label="24시간 동안 보지 않기"
            onClick={onDoNotShowAgain}
            type="primary"
          />
        )}
      </footer>
    </div>
  );
};

export default AlertModalCard;
