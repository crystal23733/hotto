import React from "react";
import "../scss/myPage.scss";
import MypageInfoContainer from "../components/Mypage/MypageInfoContainer";
import useModal from "../hook/Modal/useModal";
import MypageFormModal from "../components/Mypage/MypageFormModal";

const Mypage: React.FC = () => {
  const {isActive, handleMypageModal, closeModal} = useModal();
  return (
    <div id="mypage-container">
      <div className="box" id="mypage-container__content">
        <MypageInfoContainer />
        <MypageFormModal isActive={isActive} closeModal={closeModal} />
      </div>
    </div>
  );
};

export default Mypage;
