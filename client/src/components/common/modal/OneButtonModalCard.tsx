import React from "react";
import CommonModalProps from "client/src/components/common/modal/interface/commonModalProps";
import Text from "../atoms/text/Text";
import Button from "../atoms/button/Modal/Button";

const OneButtonModalCard: React.FC<CommonModalProps> = ({
  title,
  content,
  onClose,
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
        <Button label="확인" onClick={onClose} type="primary" />
      </footer>
    </div>
  );
};

export default OneButtonModalCard;
