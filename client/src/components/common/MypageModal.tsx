import useMypageModal from "client/src/hook/common/useMypageModal";
import React from "react";

interface MypageModalProps {
  isActive: boolean;
  closeModal: () => void;
}

/**
 * MypageModal 컴포넌트
 *
 * 사용자가 마이페이지로 진입하기 전 비밀번호를 확인하는 모달 컴포넌트입니다.
 * 비밀번호를 입력하고 "마이페이지" 버튼을 클릭하면, 비밀번호 검증 후 마이페이지로 이동합니다.
 *
 * @component
 *
 * @param {MypageModalProps} props - 컴포넌트에 전달되는 props
 * @param {boolean} props.isActive - 모달의 활성화 상태를 나타냅니다. true면 모달이 활성화됩니다.
 * @param {function} props.closeModal - 모달을 닫는 함수입니다.
 *
 * @returns {React.FC} MypageModal 컴포넌트
 */
const MypageModal: React.FC<MypageModalProps> = ({ isActive, closeModal }) => {
  const { password, setPassword, error, loading, verifyPasswordAndNavigate } =
    useMypageModal();

  /**
   * "마이페이지" 버튼 클릭 시 호출되는 함수입니다.
   * 비밀번호 검증을 수행하고, 성공 시 마이페이지로 이동합니다.
   *
   * @param {React.MouseEvent<HTMLButtonElement>} event - 클릭 이벤트
   */
  const handleMypageBtn = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    const success = await verifyPasswordAndNavigate(); // 비밀번호 검증 및 페이지 이동을 처리하고 성공 여부 반환
    if (success) {
      closeModal(); // 성공 시 모달 닫기
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
          {error && <p className="help is-danger">{error.message}</p>}
        </section>
        <footer className="modal-card-foot">
          <div className="buttons">
            <button
              className="button is-success"
              onClick={handleMypageBtn}
              disabled={loading}
            >
              마이페이지
            </button>
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
