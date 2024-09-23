import React from "react";
import useFortune from "client/src/hook/content/useFortune";

const ChatForm: React.FC = () => {
  const { contentText, setContentText, fortuneSubmit } = useFortune();
  return (
    <div id="content__chat-box">
      <form action="" className="content__chat-form" method="POST">
        <div className="content__chat-input-box">
          <input
            type="text"
            className="input is-link"
            placeholder="알고싶은 운세와 출생년월일, 시간을 알려주세요!"
            value={contentText}
            onChange={(event) => setContentText(event.target.value)}
          />
          <input
            type="submit"
            value="전송"
            className="button is-primary"
            onSubmit={(event: React.FormEvent) => {
              event.preventDefault();
              fortuneSubmit();
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default ChatForm;
