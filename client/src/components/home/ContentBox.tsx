import React from "react";

/**
 * 24.08.08
 * todo 추후 실제 게시판 데이터 필요
 * @returns {JSX.Element} - ContentBox 컴포넌트
 */
const ContentBox: React.FC = () => {
  return (
    <div id="content-box">
      {[...Array(10)].map((_, i) => (
        <div key={i}>
          <a href="">게시글입니다.</a>
        </div>
      ))}
    </div>
  );
};

export default ContentBox;
