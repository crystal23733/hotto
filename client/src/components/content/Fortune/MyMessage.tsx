import React from "react";

interface MyMessageProps {
  message: string;
}

const MyMessage: React.FC<MyMessageProps> = ({ message }) => {
  console.log(message);
  return (
    <div className="my-message">
      <div className="bubble">{message}</div> {/* 말풍선 스타일 적용 */}
    </div>
  );
};

export default MyMessage;
