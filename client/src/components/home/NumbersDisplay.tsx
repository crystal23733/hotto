import React from "react";

interface NumbersDisplayProps {
  numbers: (number | string)[];
  numberRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

const NumbersDisplay: React.FC<NumbersDisplayProps> = ({
  numbers,
  numberRefs,
}) => {
  return (
    <div id="this-week">
      <div id="this-week__header">
        <h1>금주 당첨번호</h1>
      </div>
      <div id="this-week__number">
        {numbers.map((number, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) numberRefs.current[index] = el;
            }}
          >
            {number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NumbersDisplay;
