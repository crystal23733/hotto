import TextProps from "client/src/pipes/interface/common/text/text.interface";
import React from "react";

const Text: React.FC<TextProps> = ({ content, size = "medium" }) => {
  return <p className={`is-size-${size}`}>{content}</p>;
};

export default Text;
