import React from "react";
import useFortune from "client/src/hook/content/useFortune";

interface ChatFormProps {
  addUserMessage: (message: string) => void;
}

const ChatForm: React.FC<ChatFormProps> = ({ addUserMessage }) => {
  const { contentText, setContentText, fortuneSubmit, data, setData } =
    useFortune();
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addUserMessage(contentText);
    fortuneSubmit();
    setContentText("");
  };
  return (
    <form
      action=""
      className="content__chat-form"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="content__chat-input-box">
        <input
          type="text"
          className="input is-link"
          placeholder="알고싶은 운세와 출생년월일, 시간을 알려주세요!"
          value={contentText}
          onChange={(event) => setContentText(event.target.value)}
        />
        <input type="submit" value="전송" className="button is-primary" />
      </div>
    </form>
  );
};

export default ChatForm;
