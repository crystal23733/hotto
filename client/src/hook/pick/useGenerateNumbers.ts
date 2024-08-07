import repPick from "client/src/utils/pick/repPick";
import setNumberBgColor from "client/src/utils/setNumberBgColor";
import { useState, useEffect, useRef } from "react";

const useGenerateNumbers = () => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const numberListRef = useRef<HTMLDivElement>(null);

  const generateNumbers = () => {
    const number = Array.from({ length: 45 }, (_, i) => i + 1); // 1부터 45까지의 숫자
    const random: number[] = [];
    while (random.length < 6) {
      repPick(number, random);
    }
    setNumbers(random);
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
