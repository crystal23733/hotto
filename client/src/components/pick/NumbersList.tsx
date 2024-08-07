import React from "react";

interface NumberListProps {
  numberListRef: React.RefObject<HTMLDivElement>;
}

const NumberList: React.FC<NumberListProps> = ({ numberListRef }) => {
  return (
    <div id="number__list" ref={numberListRef}>
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i}></div>
      ))}
    </div>
  );
};

export default NumberList;
