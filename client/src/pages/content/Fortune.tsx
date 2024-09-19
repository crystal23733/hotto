import BackgroundSky from "client/src/components/content/Fortune/BackgroundSky";
import ChatInput from "client/src/components/content/Fortune/ChatInput";
import React from "react";

const Fortune: React.FC = () => {
  return (
    <div id="background-box">
      <BackgroundSky />
      <ChatInput />
    </div>
  );
};

export default Fortune;
