import { conditional } from "@shared/pipes/condition";
import passwordRequest from "client/src/api/auth/passwordRequest";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface MypageModalProps {
  isActive: boolean;
  closeModal: () => void;
}

const MypageModal: React.FC<MypageModalProps> = ({ isActive, closeModal }) => {
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleMypageBtn = async () => {
    if (!conditional.passwordLength(password)) {
      setError("비밀번호가 5자 이상이어야 합니다.");
      return;
    }

    try {
      console.log(password);
      await passwordRequest(password);
      router.push("/Mypage");
    } catch (error) {
      setError("비밀번호가 일치하지 않습니다.");
    }
  };

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
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {error && <p className="help is-danger">{error}</p>}
        </section>
        <footer className="modal-card-foot">
          <div className="buttons">
            <button className="button is-success" onClick={handleMypageBtn}>마이페이지</button>
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
