import React from 'react';
import '../../../scss/components/molecules/modalCard.scss';
import CommonModalProps from 'client/src/pipes/interface/common/modal/commonModalProps.interface';
import Text from '../atoms/text/Text';
import Button from '../atoms/button/Modal/Button';

const ModalCard: React.FC<CommonModalProps> = ({ title, content, onClose }) => {
  return (
    <div className="modal-card">
      <header className="modal-card-head">
        <Text content={title} size="large" />
        <button className="delete" aria-label="close" onClick={onClose}></button>
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

export default ModalCard;
