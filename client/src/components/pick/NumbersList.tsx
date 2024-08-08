import React from "react";

/**
 * 24.08.08
 * @type {React.RefObject<HTMLDivElement>} - 숫자 목록을 표시할 HTMLDivElement에 대한 참조입니다.
 */
interface NumberListProps {
  numberListRef: React.RefObject<HTMLDivElement>;
}

/**
 * 24.08.08
 * 6개의 div 요소를 렌더링하는 컴포넌트입니다. 이 div 요소들은 숫자를 표시하는 데 사용됩니다.
 * 외부에서 조작할 수 있도록 div 요소에 대한 참조를 받습니다.
 *
 * @param {NumberListProps} props - 컴포넌트에 전달되는 props입니다.
 * @param {React.RefObject<HTMLDivElement>} props.numberListRef - 숫자 목록을 포함하는 div 요소에 대한 참조입니다.
 *
 * @returns {JSX.Element} 렌더링된 컴포넌트입니다.
 */
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
