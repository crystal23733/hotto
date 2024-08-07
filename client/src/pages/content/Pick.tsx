import { useState, useEffect, useRef } from "react";
import repPick from "../../utils/pick/repPick";
import setNumberBgColor from "../../utils/setNumberBgColor";
import "../../scss/pick.scss";

const Pick = () => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const numberListRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
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

  return (
    <div id="number">
      <div id="number__header">
        <header>번호 생성</header>
      </div>
      <div id="number__list" ref={numberListRef}>
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i}></div>
        ))}
      </div>
      <input
        type="button"
        value="번호 생성"
        id="create"
        onClick={handleClick}
      />
    </div>
  );
};

export default Pick;
