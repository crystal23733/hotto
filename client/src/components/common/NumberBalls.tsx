import React from "react";

interface NumberBallsProps {
  numbers: (number | string)[];
  numberRefs: React.MutableRefObject<HTMLDivElement[]>;
}

/**
 * 숫자 배열을 기반으로 번호 공을 렌더링하는 컴포넌트입니다.
 *
 * @param {NumberBallsProps} props - 컴포넌트에 전달된 props입니다.
 * @returns {JSX.Element} - 번호 공을 포함한 JSX 엘리먼트를 반환합니다.
 */
const NumberBalls: React.FC<NumberBallsProps> = ({ numbers, numberRefs }) => {
  return (
    <div id="number-balls">
      {numbers.map((number, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) numberRefs.current[index] = el;
          }}
          className="number-ball"
        >
          {number === "+" ? (
            <span style={{ color: "black" }}>{number}</span> // + 기호일 때만 검은색 적용
          ) : (
            number
          )}
        </div>
      ))}
    </div>
  );
};

export default NumberBalls;
