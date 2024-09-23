import React from "react";

/**
 * AiMessageProps 인터페이스
 *
 * @interface
 * @property {string} message AI가 응답한 메시지
 */
interface AiMessageProps {
  message: string;
}

/**
 * AI 메시지를 표시하는 컴포넌트
 *
 * @component
 * @param {AiMessageProps} props 컴포넌트 속성
 * @returns {JSX.Element} AI 메시지 요소
 * @date 2024.09.23
 */
const AiMessage: React.FC<AiMessageProps> = ({ message }) => {
  return (
    <div className="ai-message">
      <div className="bubble">{message}</div> {/* 말풍선 스타일 적용 */}
    </div>
  );
};

export default AiMessage;
