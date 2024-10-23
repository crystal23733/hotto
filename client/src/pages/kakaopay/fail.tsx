import React from "react";
import HomeButton from "../../components/common/button/kakaopay/HomeButton";
import "../../scss/kakaoCancel-Fail.scss";

const Cancel: React.FC = () => {
  return (
    <div className="payment-cancel">
      <h1>결제를 실패하였습니다.</h1>
      <p>결제 중 오류가 발생하였습니다.</p>
      <HomeButton />
    </div>
  );
};

export default Cancel;
