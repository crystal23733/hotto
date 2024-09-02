import React from "react";
import "../../scss/screens/loading.scss";

/**
 * 로딩 애니메이션을 렌더링 해주는 컴포넌트
 * @returns {JSX.Element} 로딩중인 상태를 표시해주는 컴포넌트
 */
const Loading: React.FC = () => {
  return <div className="spinner"></div>;
};

export default Loading;
