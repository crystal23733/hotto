import React from "react";
import homeNav from "../../../../utils/move/homeNav";

const HomeButton: React.FC = () => {
  const { handleHome } = homeNav();

  return (
    <button className="home-button" onClick={handleHome}>
      홈으로 돌아가기
    </button>
  );
};

export default HomeButton;
