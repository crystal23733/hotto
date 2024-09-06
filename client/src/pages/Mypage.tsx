import React from "react";
import "../scss/myPage.scss";
import MypageInfoContainer from "../components/Mypage/MypageInfoContainer";

const Mypage: React.FC = () => {
  return (
    <div id="mypage-container">
      <div className="box" id="mypage-container__content">
        <MypageInfoContainer />
      </div>
    </div>
  );
};

export default Mypage;
