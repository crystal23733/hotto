import React from "react";

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
