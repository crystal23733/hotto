import React from "react";
import HomeButton from "../../components/common/button/kakaopay/HomeButton";
import "../../scss/kakaoCancel-Fail.scss";

const Cancel: React.FC = () => {
  return (
    <div className="payment-cancel">
      <h1>결제가 취소되었습니다.</h1>
      <p>결제가 정상적으로 진행되지 않았습니다.</p>
      <HomeButton />
    </div>
  );
};

export default Cancel;
