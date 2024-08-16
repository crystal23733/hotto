import randomNumber from "@shared/utils/randomNumber";
import setNumberBgColor from "client/src/utils/setNumberBgColor";
import { useState, useEffect, useRef } from "react";

/**
 * 숫자를 생성하고 숫자 목록의 참조를 관리하는 커스텀 훅입니다.
 *
 * 이 훅은 1부터 45까지의 숫자 중 무작위로 6개의 숫자를 생성합니다. 생성된 숫자는
 * 상태로 저장되며, `numberListRef`를 통해 참조된 HTML 요소에 대해 숫자를 표시하고,
 * 배경 색상을 설정합니다.
 *
 * @returns {{
 *   numbers: number[],            // 현재 생성된 숫자 배열입니다.
 *   numberListRef: React.RefObject<HTMLDivElement>, // 숫자 목록의 참조를 담고 있는 Ref 객체입니다.
 *   generateNumbers: () => void   // 숫자를 생성하는 함수입니다.
 * }}
 *
 * @date 24.08.08
 */
const useGenerateNumbers = () => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const numberListRef = useRef<HTMLDivElement>(null);

  const generateNumbers = () => {
    setNumbers(randomNumber);
  };

  useEffect(() => {
    if (numberListRef.current) {
      const children = Array.from(
        numberListRef.current.children,
      ) as HTMLElement[];
      children.forEach((child, index) => {
        if (numbers[index] !== undefined) {
          child.textContent = numbers[index].toString();
          setNumberBgColor(child);
        } else {
          child.textContent = "";
          child.style.backgroundColor = "transparent";
        }
      });
    }
  }, [numbers]);

  return { numbers, numberListRef, generateNumbers };
};

export default useGenerateNumbers;
