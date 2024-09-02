import React from "react";

interface MypageModalProps {
  isActive: boolean;
  closeModal: () => void;
}

const MypageModal: React.FC<MypageModalProps> = ({ isActive, closeModal }) => {
  return (
    <div className={`modal ${isActive ? "is-active" : ""}`}>
      <div className="modal-background" onClick={closeModal}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">비밀번호 확인</p>
          <button
            className="delete"
            aria-label="close"
            onClick={closeModal}
          ></button>
        </header>
        <section className="modal-card-body">
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            className="input is-primary"
          />
        </section>
        <footer className="modal-card-foot">
          <div className="buttons">
            <button className="button is-success">마이페이지</button>
            <button className="button" type="reset" onClick={closeModal}>
              취소
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MypageModal;
