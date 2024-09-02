import { useEffect, useRef } from "react";
import setNumberBgColor from "client/src/utils/setNumberBgColor";

/**
 * 숫자 배열을 사용하여 각 숫자에 대한 ref를 설정하고 배경 색상을 지정하는 커스텀 훅입니다.
 *
 * @param {(string | number)[]} numbers - 렌더링할 숫자 배열입니다.
 * @returns {React.MutableRefObject<HTMLDivElement[]>} - HTMLDivElement 배열에 대한 ref를 반환합니다.
 */
const useNumberBalls = (
  numbers: (string | number)[],
): React.MutableRefObject<HTMLDivElement[]> => {
  const ballRefs = useRef<HTMLDivElement[]>(Array(numbers.length).fill(null));

  useEffect(() => {
    ballRefs.current.forEach((element, index) => {
      if (element && typeof numbers[index] === "number") {
        setNumberBgColor(element);
      }
    });
  }, [numbers]);

  return ballRefs;
};

export default useNumberBalls;
