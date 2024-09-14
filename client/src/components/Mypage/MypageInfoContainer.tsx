import { useAuth } from "client/src/context/AuthContext";
import React from "react";

const MypageInfoContainer: React.FC = () => {
  const { userName, userEmail } = useAuth();
  return (
    <>
      <div className="mypage-container__info-container">
        <div className="info-container__title">이름</div>
        <div className="info-container__description">{userName}</div>
      </div>
      <div className="mypage-container__info-container">
        <div className="info-container__title">이메일</div>
        <div className="info-container__description">{userEmail}</div>
      </div>
    </>
  );
};

export default MypageInfoContainer;
