import BackgroundSky from "client/src/components/content/Fortune/BackgroundSky";
import ChatForm from "client/src/components/content/Fortune/ChatForm";
import React from "react";

const Fortune: React.FC = () => {
  return (
    <div id="background-box">
      <BackgroundSky />
      <div id="content__chat-box">
        <ChatForm />
      </div>
    </div>
  );
};

export default Fortune;
