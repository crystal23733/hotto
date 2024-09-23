import React from "react";

interface AiMessageProps {
  message: string;
}

const AiMessage: React.FC<AiMessageProps> = ({ message }) => {
  return (
    <div className="ai-message">
      <div className="bubble">{message}</div> {/* 말풍선 스타일 적용 */}
    </div>
  );
};

export default AiMessage;
