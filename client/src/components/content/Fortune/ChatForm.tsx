import React from "react";
import useFortune from "client/src/hook/content/useFortune";

interface ChatFormProps {
  addUserMessage: (message: string) => void;
  addAiMessage: (message: string) => void;
}

/**
 * ChatForm 컴포넌트
 *
 * 사용자의 입력을 처리하고, 사용자가 입력한 메시지를 서버로 보내는 폼을 렌더링합니다.
 * 서버에서 응답을 받으면 AI 메시지로 처리합니다.
 *
 * @date 2024.09.23
 * @param {ChatFormProps} props - 사용자 메시지와 AI 메시지를 처리하는 함수들
 * @returns {JSX.Element} 메시지 전송 폼을 렌더링하는 컴포넌트
 */
const ChatForm: React.FC<ChatFormProps> = ({
  addUserMessage,
  addAiMessage,
}) => {
  const { contentText, setContentText, fortuneSubmit, loading } = useFortune();

  /**
   * 폼 제출 시 사용자 메시지를 추가하고 서버로 운세 요청을 보냅니다.
   *
   * @param {React.FormEvent} event - 폼 제출 이벤트
   */
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    addUserMessage(contentText);
    const response = await fortuneSubmit(); // fortuneSubmit 호출 후 결과 받기
    if (response && response.fortune) {
      addAiMessage(response.fortune.content); // 응답에서 fortune.content 추출하여 AI 메시지로 넘기기
    }
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
        <input
          type="submit"
          value="전송"
          className="button is-primary"
          disabled={loading}
        />
      </div>
    </form>
  );
};

export default ChatForm;
