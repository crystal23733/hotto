import React from "react";
import MypageFormContainer from "../components/Mypage/MypageFormContainer";
import MypageInfoContainer from "../components/Mypage/MypageInfoContainer";

const Mypage: React.FC = () => {
  return (
    <>
      <MypageInfoContainer />
      <MypageFormContainer />
    </>
  );
};

export default Mypage;
