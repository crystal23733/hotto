import React from "react";
import "../scss/myPage.scss";
import MypageInfoContainer from "../components/Mypage/MypageInfoContainer";
import useModal from "../hook/Modal/useModal";
import MypageFormModal from "../components/Mypage/MypageFormModal";

const Mypage: React.FC = () => {
  const { isActive, handleMypageModal, closeModal } = useModal();
  return (
    <div id="mypage-container">
      <div className="box" id="mypage-container__content">
        <MypageInfoContainer />
        <MypageFormModal isActive={isActive} closeModal={closeModal} />
        <div className="change-password-box">
          <button onClick={handleMypageModal}>비밀번호 변경</button>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
