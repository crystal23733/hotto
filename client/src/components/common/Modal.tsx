import React from "react";

const Modal: React.FC = () => {
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">비밀번호 확인</p>
          <button className="delete" aria-label="close"></button>
        </header>
        <form action="">
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
              <button className="button">취소</button>
            </div>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default Modal;
