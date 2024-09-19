import React from "react";

const ChatInput: React.FC = () => {
  return (
    <div id="content__chat-box">
      <form action="" className="content__chat-form">
        <div className="content__chat-input-box">
          <input
            type="text"
            className="input is-link"
            placeholder="알고싶은 운세와 출생년월일, 시간을 알려주세요!"
          />
          <input type="submit" value="전송" className="button is-primary" />
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
