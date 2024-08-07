import React from "react";

/**
 * 24.08.08
 * @interface NumbersDisplayProps
 * @property {numbers} - 숫자
 * @property {numberRefs} - 숫자 레퍼런스
 */
interface NumbersDisplayProps {
  numbers: (number | string)[];
  numberRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

/**
 * 24.08.08
 * @param {numbers}
 * @param {numberRefs}
 * @returns {JSX.Element} - 번호 나열 컴포넌트
 */
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
