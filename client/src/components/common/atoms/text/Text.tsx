import React from "react";
import TextProps from "./interface/textProps";

const Text: React.FC<TextProps> = ({ content, size = "medium" }) => {
  return <p className={`is-size-${size}`}>{content}</p>;
};

export default Text;
